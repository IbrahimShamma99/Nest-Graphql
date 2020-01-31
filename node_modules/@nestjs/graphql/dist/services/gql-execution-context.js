"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execution_context_host_1 = require("@nestjs/core/helpers/execution-context-host");
const merge_arguments_host_util_1 = require("../utils/merge-arguments-host.util");
class GqlExecutionContext extends execution_context_host_1.ExecutionContextHost {
    static create(context) {
        return merge_arguments_host_util_1.mergeArgumentsHost(context);
    }
}
exports.GqlExecutionContext = GqlExecutionContext;
