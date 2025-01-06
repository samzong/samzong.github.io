/**
 * 从 GitHub URL 中提取仓库信息
 * @param url GitHub 仓库 URL
 * @returns owner 和 repo
 */
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') return null;
    
    const [, owner, repo] = urlObj.pathname.split('/');
    if (!owner || !repo) return null;
    
    return { owner, repo };
  } catch {
    return null;
  }
}

/**
 * 获取 GitHub 仓库的 stars 数量
 * @param url GitHub 仓库 URL
 * @returns stars 数量
 */
export async function getGitHubStars(url: string): Promise<number | null> {
  const repoInfo = parseGitHubUrl(url);
  if (!repoInfo) return null;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.stargazers_count;
  } catch {
    return null;
  }
} 