"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;

const { join } = require('node:path');
const { getHooks } = require('@diplodoc/cli/lib/program');
const { getBuildHooks, getEntryHooks } = require('@diplodoc/cli');

class Extension {
    apply(program) {
        getHooks(program).Config.tap('CopyMdButton', (config) => {
            return config;
        });

        getBuildHooks(program).BeforeRun.for('html').tap('CopyMdButton', (run) => {
            if (program.config.copyMdButton === false) {
                return;
            }

            getEntryHooks(run.entry).Page.tap('CopyMdButton', (template) => {
                const extConfig = (program.config.copyMdButton && typeof program.config.copyMdButton === 'object')
                    ? program.config.copyMdButton
                    : {};

                template.addScript('_extensions/copy-md-button-extension.js', {
                    position: 'leading',
                    attrs: { defer: void 0 }
                });

                template.addScript(
                    `window.copyMdButtonOptions = ${JSON.stringify(extConfig)};`,
                    {
                        position: 'state',
                        inline: true,
                    }
                );
            });
        });

        getBuildHooks(program).AfterRun.for('html').tapPromise('CopyMdButton', async (run) => {
            if (program.config.copyMdButton === false) {
                return;
            }

            const extensionFilePath = join(__dirname, 'resources', 'copy-md-button-extension.js');
            try {
                await run.copy(
                    extensionFilePath,
                    join(run.output, '_extensions', 'copy-md-button-extension.js')
                );
            } catch (error) {
                run.logger.warn(`Unable to copy the copy-md-button extension script ${extensionFilePath}.`, error);
            }
        });
    }
}

exports.Extension = Extension;

