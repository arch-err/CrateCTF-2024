// Parse path into absolute flag and segments
function parsePath(path) {
    let isAbsolute = path.startsWith("/");
    if (isAbsolute) path = path.slice(1);
    return {
        abs: isAbsolute,
        segments: path.split("/").filter((segment) => segment && segment !== ".")
    };
}

// Join multiple paths together
function joinPaths(...paths) {
    let result = parsePath("");
    for (let path of paths) {
        if (path.abs) {
            result = { abs: true, segments: [...path.segments] };
        } else {
            result.segments = [...result.segments, ...path.segments];
        }
    }
    return result;
}

// Create directory structure in filesystem
function makeDirectory(filesystem, path) {
    let current = filesystem;
    for (let segment of path.segments) {
        if (!(segment in current)) current[segment] = new Map;
        current = current[segment];
    }
}

// Write content to a file
function writeFile(filesystem, path, content) {
    let current = filesystem;
    for (let segment of path.segments.slice(0, -1)) {
        console.log('writefile segment', segment)
        if (!(segment in current)) throw new Error("ENOENT");
        current = current[segment];
        console.log('writefile CURRENTPATH', current)
    }
    current[path.segments.at(-1)] = content;
}

// Get file or directory from filesystem
function getPath(filesystem, path) {
    let current = filesystem;
    for (let segment of path.segments.slice(0, -1)) {
        if (!(segment in current)) throw new Error("ENOENT");
        current = current[segment];
        console.log('getpath CURRENTPATH', current)
    }
    return path.segments.length === 0 ? current : current[path.segments.at(-1)];
}

// Initialize filesystem and variables
var filesystem = new Map;
var currentPath = parsePath("/");
var consoleInput = console[Symbol.asyncIterator]();
var inputBuffer = [];

// Read input from console
async function readInput(prompt) {
    if (inputBuffer.length > 0) return inputBuffer.shift();
    if (prompt) process.stdout.write(prompt);
    let { value: input, done } = await consoleInput.next();
    if (done) return;
    let [command, ...args] = input.split(/\s+/);
    inputBuffer = args;
    return command;
}

// Main command processing loop
var state = {};
while (true) {
    console.log('\nSTATE:', state)
    console.log('FILESYSTEM:', filesystem)
    console.log('CurrentPath:', currentPath)
    // Handle various command states
    if ("read" in state) {
        let value = await readInput(state.read.dest + " > ");
        console.log('VALUE:', value)
        state[state.read.dest] = value;
        let nextState = state.read.next;
        delete state.read;
        state = { ...state, ...nextState };
        continue;
    } else if ("mkdir" in state) {
        makeDirectory(filesystem, joinPaths(currentPath, parsePath(state.dir)));
        delete state.mkdir;
    } else if ("write" in state) {
        writeFile(filesystem, joinPaths(currentPath, parsePath(state.file)), state.contents);
        delete state.write;
    } else if ("ls" in state) {
        let target = getPath(filesystem, joinPaths(currentPath, parsePath(state.path)));
        if (target instanceof Map) {
            console.log(Object.keys(target).join("\t"));
        } else if (target === undefined) {
            console.log(`${state.path}: no such file or directory`);
        } else {
            console.log(state.path);
        }
        delete state.ls;
    } else if ("id" in state) {
        console.log("uid=1000(user) gid=100(users) groups=100(users),25(floppy)");
        delete state.id;
    } else if ("cat" in state) {
        let target = getPath(filesystem, joinPaths(currentPath, parsePath(state.file)));
        if (target instanceof Map) {
            console.log(`${state.path}: is a directory`);
        } else if (target === undefined) {
            console.log(`${state.path}: no such file or directory`);
        } else {
            console.log(target);
        }
        delete state.cat;
    } else if ("checkpassword" in state) {
        let nextState = await Bun.password.verify(
            state.password,
            "$argon2id$v=19$m=65536,t=2,p=1$nGJgXijpFTZf+xPlduAKQr84I+r0/kkZ3KBQ568IQSw$CqhQyf+b6wnNNwVs90hQLqnAbuAlp8PsloOy2n9MeGQ"
        ) ? state.checkpassword.next : {};
        delete state.checkpassword;
        state = { ...state, ...nextState };
        continue;
    } else if ("writeflag" in state) {
        console.log('WRITING FLAG')
        writeFile(filesystem, joinPaths(currentPath, parsePath(state.file)), Bun.env.FLAG ?? "ingen flagga!?!?!?");
        delete state.writeflag;
    } else if ("cd" in state) {
        let newPath = joinPaths(currentPath, parsePath(state.path));
        if (getPath(filesystem, newPath) instanceof Map) {
            currentPath = newPath;
        } else {
            console.log(`the directory ${state.path} does not exist`);
        }
        delete state.cd;
    } else if ("pwd" in state) {
        console.log("/" + currentPath.segments.join("/"));
        delete state.pwd;
    }

    // Read next command
    let command = await readInput("$ ");
    if (command === undefined) break;

    // Process commands
    switch (command) {
        case "mkdir":
            state.read = { dest: "dir", next: { mkdir: undefined } };
            break;
        case "write":
            state.read = { dest: "file", next: { read: { dest: "contents", next: { write: undefined } } } };
            break;
        case "ls":
            state.read = { dest: "path", next: { ls: undefined } };
            break;
        case "id":
            state.id = undefined;
            break;
        case "cat":
            state.read = { dest: "file", next: { cat: undefined } };
            break;
        case "writeflag":
            state.read = {
                dest: "password",
                next: { checkpassword: { next: { read: { dest: "file", next: { writeflag: undefined } } } } }
            };
            break;
        case "cd":
            state.read = { dest: "path", next: { cd: undefined } };
            break;
        case "pwd":
            state.pwd = undefined;
            break;
        case "":
            break;
        default:
            throw new Error(`command ${command} not found`);
    }
}