"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execution_context_host_1 = require("@nestjs/core/helpers/execution-context-host");
const merge_arguments_host_util_1 = require("../utils/merge-arguments-host.util");
class GqlArgumentsHost extends execution_context_host_1.ExecutionContextHost {
    static create(host) {
        return merge_arguments_host_util_1.mergeArgumentsHost(host);
    }
}
exports.GqlArgumentsHost = GqlArgumentsHost;
