import process from 'process';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { execSync } from 'child_process';

const PKG = JSON.parse(fs.readFileSync('./package.json').toString());
const IS_WINDOWS = os.platform() === 'win32';
const MAYOR_VERSION = PKG.version.split('.')[0];
const task = process.argv.slice(2).join(' ');
const dist = 'dist-build-ts'

run();
async function run() {
  switch (task) {
    case 'prepare': {
      buildTypescript(false);
      break;
    }
    case 'typescript:build': {
      // installDeps();
      buildTypescript(true);
      replaceVersion();
      break;
    }
    case 'typescript:watch': {
      deleteLib();
      executeCmd('tsc --watch');
      break;
    }
    case 'lint': {
      lint();
      break;
    }
    default: {
      logError('unknown task');
      exitWithError();
    }
  }
}

function deleteLib() {
  if (!fs.existsSync(dist)) { return; }
  logInfo('deleteLib()');
  if (!IS_WINDOWS) {
    executeCmd('rm -rf dist-build-ts');
  } else {
    executeCmd('rmdir /s /q "dist-build-ts"', false);
  }
}

function installDeps() {
  logInfo('installDeps()');
  executeCmd('npm ci --ignore-scripts');
  executeCmd('npm install --package-lock-only --ignore-scripts');
}

function buildTypescript(force = false) {
  if (!force && fs.existsSync(dist)) { return; }
  logInfo('buildTypescript()');
  deleteLib();
  executeCmd('tsc');
}

function executeCmd(command, exitOnError = true) {
  logInfo(`executeCmd(): ${command}`);
  try {
    execSync(command, { stdio: ['ignore', process.stdout, process.stderr] });
  } catch (error) {
    logError(`executeCmd() failed, exiting: ${error}`);
    if (exitOnError) { exitWithError(); }
  }
}
function logInfo(message) {
  console.log(`npm-scripts \x1b[36m[INFO] [${task}]\x1b\[0m`, message);
}
function logWarn(message) {
  console.warn(`npm-scripts \x1b[33m[WARN] [${task}]\x1b\[0m`, message);
}
function logError(message) {
  console.error(`npm-scripts \x1b[31m[ERROR] [${task}]\x1b\[0m`, message);
}
function exitWithError() { process.exit(1); }

function lint() {
  logInfo('lint()');
  executeCmd('eslint -c .eslintrc.js --max-warnings 0 src-ts');
}

function replaceVersion() {
  logInfo('replaceVersion()');
  // const files = [`${dist}/index.js`, `${dist}/index.d.ts`];
  //const files = fs.readdirSync(dist, { withFileTypes: true, recursive: true });
  const files = fs.readdirSync(dist, { withFileTypes: true });
  logInfo(files);
  for (const file of files) {
    // logInfo(file.name);
    if (!file.name || file.isFile && !file.isFile()) { continue; }
    // NOTE: dirent.path is only available in Node >= 20.
    const filePath = path.join(file.path ?? dist, file.name);
    // const filePath = file
    logInfo(filePath);
    const text = fs.readFileSync(filePath, { encoding: 'utf8' });
    const result = text.replace(/__SDK_CLIENT_VERSION__/g, PKG.version);
    fs.writeFileSync(filePath, result, { encoding: 'utf8' });
  }
}