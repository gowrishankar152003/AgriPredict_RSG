import { Octokit } from '@octokit/rest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// You'll need to set these environment variables
const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;

if (!token || !owner || !repo) {
  console.error('Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables');
  process.exit(1);
}

const octokit = new Octokit({ auth: token });

// Function to get all files recursively
function getAllFiles(dir, arrayOfFiles = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (!file.startsWith('.')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function pushToGithub() {
  try {
    // Get the current commit SHA
    const { data: ref } = await octokit.git.getRef({
      owner,
      repo,
      ref: 'heads/main',
    }).catch(() => ({ data: null }));

    const baseTree = ref?.object?.sha;

    // Create blobs for each file
    const files = getAllFiles('.');
    const blobs = await Promise.all(
      files.map(async file => {
        const content = readFileSync(file, 'utf8');
        const { data } = await octokit.git.createBlob({
          owner,
          repo,
          content,
          encoding: 'utf-8',
        });
        return {
          path: file,
          mode: '100644',
          type: 'blob',
          sha: data.sha,
        };
      })
    );

    // Create a new tree
    const { data: tree } = await octokit.git.createTree({
      owner,
      repo,
      tree: blobs,
      base_tree: baseTree,
    });

    // Create a new commit
    const { data: commit } = await octokit.git.createCommit({
      owner,
      repo,
      message: 'Update from WebContainer',
      tree: tree.sha,
      parents: baseTree ? [baseTree] : [],
    });

    // Update the reference
    await octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: commit.sha,
    });

    console.log('Successfully pushed to GitHub!');
  } catch (error) {
    console.error('Error pushing to GitHub:', error.message);
    process.exit(1);
  }
}

pushToGithub();