"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *     http://aws.amazon.com/asl/
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
require("setimmediate");
var apollo_client_1 = require("apollo-client");
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var apollo_link_1 = require("apollo-link");
var apollo_link_http_1 = require("apollo-link-http");
var apollo_utilities_1 = require("apollo-utilities");
var index_1 = require("./cache/index");
exports.defaultDataIdFromObject = index_1.defaultDataIdFromObject;
var offline_cache_1 = require("./cache/offline-cache");
var link_1 = require("./link");
exports.AUTH_TYPE = link_1.AUTH_TYPE;
var store_1 = require("./store");
var utils_1 = require("./utils");
var conflict_resolution_link_1 = require("./link/conflict-resolution-link");
var retry_link_1 = require("./link/retry-link");
var deltaSync_1 = require("./deltaSync");
exports.buildSync = deltaSync_1.buildSync;
var subscription_handshake_link_1 = require("./link/subscription-handshake-link");
exports.createSubscriptionHandshakeLink = function (url, resultsFetcherLink) {
    if (resultsFetcherLink === void 0) { resultsFetcherLink = apollo_link_http_1.createHttpLink({ uri: url }); }
    return apollo_link_1.ApolloLink.split(function (operation) {
        var query = operation.query;
        var _a = apollo_utilities_1.getMainDefinition(query), kind = _a.kind, graphqlOperation = _a.operation;
        var isSubscription = kind === 'OperationDefinition' && graphqlOperation === 'subscription';
        return isSubscription;
    }, apollo_link_1.ApolloLink.from([
        new link_1.NonTerminatingLink('controlMessages', {
            link: new apollo_link_1.ApolloLink(function (operation, _forward) { return new apollo_link_1.Observable(function (observer) {
                var _a;
                var _b = operation.variables, _c = subscription_handshake_link_1.CONTROL_EVENTS_KEY, controlEvents = _b[_c], variables = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
                if (typeof controlEvents !== 'undefined') {
                    operation.variables = variables;
                }
                observer.next((_a = {}, _a[subscription_handshake_link_1.CONTROL_EVENTS_KEY] = controlEvents, _a));
                return function () { };
            }); })
        }),
        new link_1.NonTerminatingLink('subsInfo', { link: resultsFetcherLink }),
        new link_1.SubscriptionHandshakeLink('subsInfo'),
    ]), resultsFetcherLink);
};
exports.createAuthLink = function (_a) {
    var url = _a.url, region = _a.region, auth = _a.auth;
    return new link_1.AuthLink({ url: url, region: region, auth: auth });
};
exports.createAppSyncLink = function (_a) {
    var url = _a.url, region = _a.region, auth = _a.auth, complexObjectsCredentials = _a.complexObjectsCredentials, _b = _a.resultsFetcherLink, resultsFetcherLink = _b === void 0 ? apollo_link_http_1.createHttpLink({ uri: url }) : _b, conflictResolver = _a.conflictResolver;
    var link = apollo_link_1.ApolloLink.from([
        createLinkWithStore(function (store) { return new link_1.OfflineLink(store); }),
        new conflict_resolution_link_1.default(conflictResolver),
        new link_1.ComplexObjectLink(complexObjectsCredentials),
        retry_link_1.createRetryLink(apollo_link_1.ApolloLink.from([
            exports.createAuthLink({ url: url, region: region, auth: auth }),
            exports.createSubscriptionHandshakeLink(url, resultsFetcherLink)
        ]))
    ].filter(Boolean));
    return link;
};
exports.createLinkWithCache = function (createLinkFunc) {
    if (createLinkFunc === void 0) { createLinkFunc = function (cache) { return new apollo_link_1.ApolloLink(utils_1.passthroughLink); }; }
    var theLink;
    return new apollo_link_1.ApolloLink(function (op, forward) {
        if (!theLink) {
            var cache = op.getContext().cache;
            theLink = createLinkFunc(cache);
        }
        return theLink.request(op, forward);
    });
};
var createLinkWithStore = function (createLinkFunc) {
    if (createLinkFunc === void 0) { createLinkFunc = function (store) { return new apollo_link_1.ApolloLink(utils_1.passthroughLink); }; }
    return exports.createLinkWithCache(function (cache) {
        var store = cache.store;
        return store ? createLinkFunc(store) : new apollo_link_1.ApolloLink(utils_1.passthroughLink);
    });
};
;
var AWSAppSyncClient = /** @class */ (function (_super) {
    __extends(AWSAppSyncClient, _super);
    function AWSAppSyncClient(_a, options) {
        var url = _a.url, region = _a.region, auth = _a.auth, conflictResolver = _a.conflictResolver, complexObjectsCredentials = _a.complexObjectsCredentials, _b = _a.cacheOptions, cacheOptions = _b === void 0 ? {} : _b, _c = _a.disableOffline, disableOffline = _c === void 0 ? false : _c, _d = _a.offlineConfig, _e = _d === void 0 ? {} : _d, _f = _e.storage, storage = _f === void 0 ? undefined : _f, _g = _e.callback, callback = _g === void 0 ? function () { } : _g, _h = _e.storeCacheRootMutation, storeCacheRootMutation = _h === void 0 ? false : _h;
        var _this = this;
        var _j = options || {}, _k = _j.cache, customCache = _k === void 0 ? undefined : _k, _l = _j.link, customLink = _l === void 0 ? undefined : _l;
        if (!customLink && (!url || !region || !auth)) {
            throw new Error('In order to initialize AWSAppSyncClient, you must specify url, region and auth properties on the config object or a custom link.');
        }
        var resolveClient;
        var dataIdFromObject = disableOffline ? function () { return null; } : cacheOptions.dataIdFromObject || index_1.defaultDataIdFromObject;
        var store = disableOffline ? null : store_1.createStore(function () { return _this; }, function () { resolveClient(_this); }, dataIdFromObject, storage, callback);
        var cache = disableOffline
            ? (customCache || new apollo_cache_inmemory_1.InMemoryCache(cacheOptions))
            : new index_1.OfflineCache({ store: store, storeCacheRootMutation: storeCacheRootMutation }, cacheOptions);
        var waitForRehydrationLink = new apollo_link_1.ApolloLink(function (op, forward) {
            var handle = null;
            return new apollo_link_1.Observable(function (observer) {
                _this.hydratedPromise.then(function () {
                    handle = utils_1.passthroughLink(op, forward).subscribe(observer);
                }).catch(observer.error);
                return function () {
                    if (handle) {
                        handle.unsubscribe();
                    }
                };
            });
        });
        var link = waitForRehydrationLink.concat(customLink || exports.createAppSyncLink({ url: url, region: region, auth: auth, complexObjectsCredentials: complexObjectsCredentials, conflictResolver: conflictResolver }));
        var newOptions = __assign({}, options, { link: link,
            cache: cache });
        _this = _super.call(this, newOptions) || this;
        _this.hydratedPromise = disableOffline ? Promise.resolve(_this) : new Promise(function (resolve) { resolveClient = resolve; });
        _this._disableOffline = disableOffline;
        _this._store = store;
        return _this;
    }
    AWSAppSyncClient.prototype.hydrated = function () {
        return this.hydratedPromise;
    };
    ;
    AWSAppSyncClient.prototype.isOfflineEnabled = function () {
        return !this._disableOffline;
    };
    AWSAppSyncClient.prototype.mutate = function (options) {
        if (!this.isOfflineEnabled()) {
            return _super.prototype.mutate.call(this, options);
        }
        var doIt = false;
        var origContext = options.context, optimisticResponse = options.optimisticResponse, update = options.update, fetchPolicy = options.fetchPolicy, otherOptions = __rest(options, ["context", "optimisticResponse", "update", "fetchPolicy"]);
        var context = __assign({}, origContext, { AASContext: {
                doIt: doIt,
                optimisticResponse: optimisticResponse,
                update: update,
                fetchPolicy: fetchPolicy,
            } });
        return _super.prototype.mutate.call(this, __assign({ optimisticResponse: optimisticResponse,
            context: context,
            update: update,
            fetchPolicy: fetchPolicy }, otherOptions));
    };
    AWSAppSyncClient.prototype.sync = function (options) {
        var _this = this;
        if (!this.isOfflineEnabled()) {
            throw new Error('Not supported');
        }
        return new apollo_link_1.Observable(function (observer) {
            var handle;
            var callback = function (subscription) {
                handle = subscription;
            };
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var hash, itemInHash, _a, baseLastSyncTimestamp;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.hydrated()];
                        case 1:
                            _b.sent();
                            hash = deltaSync_1.hashForOptions(options);
                            itemInHash = this._store.getState()[offline_cache_1.METADATA_KEY][deltaSync_1.DELTASYNC_KEY].metadata[hash];
                            _a = (itemInHash || {}).baseLastSyncTimestamp, baseLastSyncTimestamp = _a === void 0 ? null : _a;
                            deltaSync_1.boundEnqueueDeltaSync(this._store, __assign({}, options, { baseLastSyncTimestamp: baseLastSyncTimestamp }), observer, callback);
                            return [2 /*return*/];
                    }
                });
            }); })();
            return function () {
                if (handle) {
                    handle.unsubscribe();
                }
            };
        }).subscribe(function () { });
    };
    return AWSAppSyncClient;
}(apollo_client_1.default));
exports.AWSAppSyncClient = AWSAppSyncClient;
exports.default = AWSAppSyncClient;
