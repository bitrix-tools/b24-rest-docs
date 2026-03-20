"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
const node_assert_1 = require("node:assert");
const node_path_1 = require("node:path");
const program_1 = require("@diplodoc/cli/lib/program");
const cli_1 = require("@diplodoc/cli");
class Extension {
	apply(program) {
		(0, program_1.getHooks)(program).Config.tap('FeedbackControl', (config) => {
			if (!config.feedbackControl || "boolean" === typeof config.feedbackControl) {
				return config;
			}
			(0, node_assert_1.ok)(config.feedbackControl.endpoint !== '', 'feedbackControl.endpoint must be not empty');
			return config;
		});
		(0, cli_1.getBuildHooks)(program).BeforeRun.for('html').tap('FeedbackControl', (run) => {
			if (!program.config.feedbackControl) {
				return;
			}
			(0, cli_1.getEntryHooks)(run.entry).Page.tap('FeedbackControl', (template) => {
				const controlConfig = program.config.feedbackControl === true ? {} : program.config.feedbackControl;
				template.addScript('_extensions/feedback-control-extension.js', {
					position: 'leading',
					attrs: {
						defer: void 0
					}
				});
				template.addScript(`window.feedbackControlExtensionInit(${JSON.stringify(controlConfig)})`, {
					position: 'state',
					inline: true,
				});
			});
		});
		(0, cli_1.getBuildHooks)(program).AfterRun.for('html').tapPromise('FeedbackControl', async (run) => {
			if (!program.config.feedbackControl) {
				return;
			}
			const extensionFilePath = (0, node_path_1.join)(__dirname, 'resources', 'feedback-control-extension.js');
			try {
				await run.copy(extensionFilePath, (0, node_path_1.join)(run.output, '_extensions', 'feedback-control-extension.js'));
			}
			catch (error) {
				run.logger.warn(`Unable copy the feedback-control extension script ${extensionFilePath}.`, error);
			}
		});
	}
}
exports.Extension = Extension;