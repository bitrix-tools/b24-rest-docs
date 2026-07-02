"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;

const fs = require("node:fs/promises");
const path = require("node:path");
const {getBuildHooks} = require("@diplodoc/cli");

const SCRIPT_RE = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*data-faq-schema[^>]*>[\s\S]*?<\/script>\s*/i;
const HEAD_CLOSE_RE = /<\/head>/i;

class Extension {
    apply(program) {
        getBuildHooks(program).AfterRun.for("html").tapPromise("FaqSchema", async (run) => {
            await processHtmlDirectory(run.input, run.output, run.logger);
        });
    }
}

exports.Extension = Extension;

async function processHtmlDirectory(inputDir, outputDir, logger) {
    const htmlFiles = await collectHtmlFiles(outputDir);

    for (const htmlPath of htmlFiles) {
        try {
            const relativeHtmlPath = path.relative(outputDir, htmlPath);
            const sourceMdPath = path.join(inputDir, relativeHtmlPath.replace(/\.html$/i, ".md"));

            if (!(await fileExists(sourceMdPath))) {
                continue;
            }

            const markdown = await fs.readFile(sourceMdPath, "utf8");
            const questions = extractQuestionsFromMarkdown(markdown);
            if (questions.length === 0) {
                continue;
            }

            const originalHtml = await fs.readFile(htmlPath, "utf8");
            const schema = buildSchema(questions);
            const schemaTag = `<script type="application/ld+json" data-faq-schema>\n${JSON.stringify(schema, null, 2)}\n</script>\n`;
            const htmlWithoutOldSchema = originalHtml.replace(SCRIPT_RE, "");

            if (!HEAD_CLOSE_RE.test(htmlWithoutOldSchema)) {
                logger.warn(`FAQ schema was not added: missing </head> in ${htmlPath}`);
                continue;
            }

            const updatedHtml = htmlWithoutOldSchema.replace(HEAD_CLOSE_RE, `${schemaTag}</head>`);
            if (updatedHtml !== originalHtml) {
                await fs.writeFile(htmlPath, updatedHtml, "utf8");
            }
        } catch (error) {
            logger.warn(`Unable to generate FAQ schema for ${htmlPath}`, error);
        }
    }
}

async function collectHtmlFiles(rootDir) {
    const result = [];
    const stack = [rootDir];

    while (stack.length > 0) {
        const currentDir = stack.pop();
        const entries = await fs.readdir(currentDir, {withFileTypes: true});

        for (const entry of entries) {
            const entryPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                stack.push(entryPath);
                continue;
            }

            if (entry.isFile() && entry.name.endsWith(".html")) {
                result.push(entryPath);
            }
        }
    }

    return result;
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

function extractQuestionsFromMarkdown(markdown) {
    const lines = stripFrontMatter(markdown).split(/\r?\n/);
    const topHeadingIndex = lines.findIndex((line) => /^#\s+/.test(line.trim()));
    const topHeading = topHeadingIndex >= 0 ? lines[topHeadingIndex].trim() : "";

    let startIndex = -1;
    let stopLevel = 0;

    if (containsFaqWord(topHeading)) {
        startIndex = topHeadingIndex + 1;
        stopLevel = 1;
    } else {
        for (let index = 0; index < lines.length; index += 1) {
            const heading = parseHeading(lines[index]);
            if (heading && containsFaqWord(heading.text)) {
                startIndex = index + 1;
                stopLevel = heading.level;
                break;
            }
        }
    }

    if (startIndex < 0) {
        return [];
    }

    const entities = [];
    let currentQuestion = null;
    let answerBuffer = [];

    const flushQuestion = () => {
        if (!currentQuestion) {
            return;
        }

        const answer = normalizeMarkdownText(answerBuffer.join("\n"));
        if (answer) {
            entities.push({
                "@type": "Question",
                name: currentQuestion,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: answer,
                },
            });
        }

        currentQuestion = null;
        answerBuffer = [];
    };

    for (let index = startIndex; index < lines.length; index += 1) {
        const line = lines[index];
        const trimmed = line.trim();
        const heading = parseHeading(trimmed);

        if (heading && heading.level <= stopLevel) {
            break;
        }

        const question = extractQuestion(trimmed);
        if (question) {
            flushQuestion();
            currentQuestion = question;
            continue;
        }

        if (currentQuestion) {
            answerBuffer.push(line);
        }
    }

    flushQuestion();

    return entities;
}

function stripFrontMatter(markdown) {
    if (!markdown.startsWith("---")) {
        return markdown;
    }

    const parts = markdown.split(/\r?\n/);
    let endIndex = -1;

    for (let index = 1; index < parts.length; index += 1) {
        if (parts[index].trim() === "---") {
            endIndex = index;
            break;
        }
    }

    if (endIndex < 0) {
        return markdown;
    }

    return parts.slice(endIndex + 1).join("\n");
}

function parseHeading(line) {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (!match) {
        return null;
    }

    return {
        level: match[1].length,
        text: match[2].trim(),
    };
}

function containsFaqWord(text) {
    return /\bFAQ\b/i.test(text);
}

function extractQuestion(line) {
    const boldQuestionMatch = line.match(/^\*\*(.+?)\*\*$/);
    if (boldQuestionMatch) {
        return normalizeMarkdownText(boldQuestionMatch[1]);
    }

    const heading = parseHeading(line);
    if (heading && heading.level === 3) {
        return normalizeMarkdownText(heading.text);
    }

    return "";
}

function normalizeMarkdownText(text) {
    return text
        .replace(/\{%\s*note[\s\S]*?%\}|\{%\s*endnote\s*%\}/g, " ")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        .replace(/^>\s*/gm, "")
        .replace(/\*\*/g, "")
        .replace(/__/g, "")
        .replace(/\r?\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function buildSchema(mainEntity) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity,
    };
}
