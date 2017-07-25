var exec = require('child_process').exec;
var config = require('./upload-to-s3-config');
var path = require('path');
var fs = require('fs');
var win32 = process.platform === 'win32';

var mimeTypes = {
    'html': 'text/html',
    'js': 'application/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml'
}

var unixifyPath = function(filepath) {
    if (win32) {
        return filepath.replace(/\\/g, '/');
    } else {
        return filepath;
    }
};

var recurse = function(rootdir, callback, subdir) {
    var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
    fs.readdirSync(abspath).forEach(function(filename) {
        var filepath = path.join(abspath, filename);
        if (fs.statSync(filepath).isDirectory()) {
            recurse(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')));
        } else {
            callback(unixifyPath(filepath), rootdir, subdir, filename);
        }
    });
};

var getContentType = function(filename) {
    var mat = filename.match(/\.(\w+)$/)

    if (mat) {
        var suffix = mat[1]
        return mimeTypes[suffix]
    }
}

var uploadFiles = []

recurse(config.src, (abspath, rootdir, subdir, filename) => {
    var metadata = {}

    var obj = {
        src: abspath,
        dest: subdir ? path.join(config.dest.folder, subdir, filename) : path.join(config.dest.folder, filename),
        data: metadata
    }

    config.handlers.forEach((handler) => {
        if (handler.test.test(abspath)) {
            handler.handler.call(this, obj)
        }
    })

    if (!metadata['content-type']) {
        var contentType = getContentType(obj.dest)
        if (contentType) {
            metadata['content-type'] = contentType
        }
    }

    uploadFiles.push(obj)
})

uploadFiles.forEach((file) => {
    var commands = ['aws s3api put-object',
        '--bucket', config.dest.bucket,
        '--key', file.dest,
        '--body', file.src
    ]

    for (var name in file.data) {
        var value = file.data[name]
        commands.push('--' + name, value)
    }

    exec(commands.join(' '), (error, stdout, stderr) => {
        console.log('uploaded: ' + file.dest)
    })
})