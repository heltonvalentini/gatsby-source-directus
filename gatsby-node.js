'use strict';

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _process = require('./process');

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _gatsbySourceFilesystem = require('gatsby-source-filesystem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _url = '';
var _apiKey = '';
var _version = '1.1';
var _requestParams = {
    depth: 1
};
var _fileRequestParams = {};
var _auth = {};

exports.sourceNodes = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref, _ref2) {
        var boundActionCreators = _ref.boundActionCreators,
            getNode = _ref.getNode,
            store = _ref.store,
            cache = _ref.cache,
            createNodeId = _ref.createNodeId;
        var url = _ref2.url,
            protocol = _ref2.protocol,
            apiKey = _ref2.apiKey,
            version = _ref2.version,
            nameExceptions = _ref2.nameExceptions,
            requestParams = _ref2.requestParams,
            fileRequestParams = _ref2.fileRequestParams,
            auth = _ref2.auth;

        var createNode, fetcher, allTablesData, items, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tableData, tableNode, tableItems, name, ItemNode, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, tableItemData, tableItemNode, allFilesData, filesDownloaded, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, fileData, fileNode, localFileNode;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        createNode = boundActionCreators.createNode;


                        protocol = protocol !== undefined && protocol !== '' ? protocol : 'http';
                        protocol = protocol + "://";

                        // Trim any trailing slashes from the URL
                        url = url.replace(/\/$/, "");

                        // Assign the version
                        _version = version !== undefined && version !== '' ? version : _version;

                        // Merge the URL with a protocol
                        _url = protocol + url + ('/api/' + _version + '/');

                        // Assign the API key
                        _apiKey = apiKey;

                        // Set request parameters
                        _requestParams = requestParams || _requestParams;

                        // Set parameters for file fetching
                        _fileRequestParams = fileRequestParams || _fileRequestParams;

                        // Set htaccess auth for file download
                        _auth = auth || _auth;

                        // Initialize the Fetcher class with API key and URL
                        fetcher = new _fetch2.default(_apiKey, _url, _version, _requestParams, _fileRequestParams);


                        console.log('gatsby-source-directus'.cyan, 'Fetching Directus tables data...');

                        // Fetch all the tables with data from Directus in a raw format
                        _context.next = 14;
                        return fetcher.getAllTablesData();

                    case 14:
                        allTablesData = _context.sent;
                        items = [];

                        console.log('gatsby-source-directus'.blue, 'success'.green, 'Fetched', allTablesData.length.toString().yellow, 'tables from Directus.');

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 20;
                        _iterator = allTablesData[Symbol.iterator]();

                    case 22:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 69;
                            break;
                        }

                        tableData = _step.value;
                        tableNode = (0, _process.TableNode)(tableData);
                        _context.next = 27;
                        return createNode(tableNode);

                    case 27:
                        _context.next = 29;
                        return fetcher.getAllItemsForTable(tableData.name);

                    case 29:
                        tableItems = _context.sent;

                        console.log('gatsby-source-directus'.blue, 'success'.green, 'Fetched', tableItems.length.toString().cyan, 'items for ', tableData.name.cyan, ' table...');

                        // Get the name for this node type
                        name = (0, _process.getNodeTypeNameForTable)(tableData.name, nameExceptions);

                        console.log('gatsby-source-directus'.blue, 'info'.cyan, 'Generating Directus' + name + ' node type...');

                        // We're creating a separate Item Type for every table
                        ItemNode = (0, _process.createTableItemFactory)(name);

                        if (!(tableItems && tableItems.length > 0)) {
                            _context.next = 65;
                            break;
                        }

                        // Get all the items for the table above and create a gatsby node for it
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context.prev = 38;
                        _iterator3 = tableItems[Symbol.iterator]();

                    case 40:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context.next = 48;
                            break;
                        }

                        tableItemData = _step3.value;

                        // Create a Table Item node based on the API response
                        tableItemNode = ItemNode(tableItemData, {
                            parent: tableNode.id
                        });

                        // Pass it to Gatsby to create a node

                        _context.next = 45;
                        return createNode(tableItemNode);

                    case 45:
                        _iteratorNormalCompletion3 = true;
                        _context.next = 40;
                        break;

                    case 48:
                        _context.next = 54;
                        break;

                    case 50:
                        _context.prev = 50;
                        _context.t0 = _context['catch'](38);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context.t0;

                    case 54:
                        _context.prev = 54;
                        _context.prev = 55;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 57:
                        _context.prev = 57;

                        if (!_didIteratorError3) {
                            _context.next = 60;
                            break;
                        }

                        throw _iteratorError3;

                    case 60:
                        return _context.finish(57);

                    case 61:
                        return _context.finish(54);

                    case 62:
                        console.log('gatsby-source-directus'.blue, 'success'.green, 'Directus' + name + ' node generated');
                        _context.next = 66;
                        break;

                    case 65:
                        console.log('gatsby-source-directus'.blue, 'warning'.yellow, tableData.name + ' table has no rows. Skipping...');

                    case 66:
                        _iteratorNormalCompletion = true;
                        _context.next = 22;
                        break;

                    case 69:
                        _context.next = 75;
                        break;

                    case 71:
                        _context.prev = 71;
                        _context.t1 = _context['catch'](20);
                        _didIteratorError = true;
                        _iteratorError = _context.t1;

                    case 75:
                        _context.prev = 75;
                        _context.prev = 76;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 78:
                        _context.prev = 78;

                        if (!_didIteratorError) {
                            _context.next = 81;
                            break;
                        }

                        throw _iteratorError;

                    case 81:
                        return _context.finish(78);

                    case 82:
                        return _context.finish(75);

                    case 83:

                        console.log('gatsby-source-directus'.cyan, 'Fetching Directus files data...');

                        _context.next = 86;
                        return fetcher.getAllFiles();

                    case 86:
                        allFilesData = _context.sent;


                        console.log('gatsby-source-directus'.blue, 'success'.green, 'Fetched', allFilesData.length.toString().yellow, 'files from Directus.');
                        console.log('gatsby-source-directus'.cyan, 'Downloading Directus files...');

                        filesDownloaded = 0;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 93;
                        _iterator2 = allFilesData[Symbol.iterator]();

                    case 95:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context.next = 114;
                            break;
                        }

                        fileData = _step2.value;
                        fileNode = (0, _process.FileNode)(fileData);
                        localFileNode = void 0;
                        _context.prev = 99;
                        _context.next = 102;
                        return (0, _gatsbySourceFilesystem.createRemoteFileNode)({
                            url: protocol + url + fileNode.url,
                            store: store,
                            cache: cache,
                            createNode: createNode,
                            createNodeId: createNodeId,
                            auth: _auth
                        });

                    case 102:
                        localFileNode = _context.sent;
                        _context.next = 108;
                        break;

                    case 105:
                        _context.prev = 105;
                        _context.t2 = _context['catch'](99);

                        console.error('\ngatsby-source-directus'.blue, 'error'.red, 'gatsby-source-directus: An error occurred while downloading the files.', _context.t2);

                    case 108:

                        if (localFileNode) {
                            filesDownloaded++;
                            fileNode.localFile___NODE = localFileNode.id;
                        }

                        _context.next = 111;
                        return createNode(fileNode);

                    case 111:
                        _iteratorNormalCompletion2 = true;
                        _context.next = 95;
                        break;

                    case 114:
                        _context.next = 120;
                        break;

                    case 116:
                        _context.prev = 116;
                        _context.t3 = _context['catch'](93);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t3;

                    case 120:
                        _context.prev = 120;
                        _context.prev = 121;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 123:
                        _context.prev = 123;

                        if (!_didIteratorError2) {
                            _context.next = 126;
                            break;
                        }

                        throw _iteratorError2;

                    case 126:
                        return _context.finish(123);

                    case 127:
                        return _context.finish(120);

                    case 128:

                        if (filesDownloaded === allFilesData.length) {
                            console.log('gatsby-source-directus'.blue, 'success'.green, 'Downloaded all', filesDownloaded.toString().yellow, 'files from Directus.');
                        } else {
                            console.log('gatsby-source-directus'.blue, 'warning'.yellow, 'skipped', (filesDownloaded - allFilesData.length).toString().yellow, 'files from downloading');
                        }

                        console.log("AFTER");

                    case 130:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[20, 71, 75, 83], [38, 50, 54, 62], [55,, 57, 61], [76,, 78, 82], [93, 116, 120, 128], [99, 105], [121,, 123, 127]]);
    }));

    return function (_x, _x2) {
        return _ref3.apply(this, arguments);
    };
}();