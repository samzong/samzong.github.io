import fs from "fs";
import path from "path";
import { BasePost, walkFiles, formatDate } from "./fileWalker";

interface Post extends BasePost {
  tags: string[];
}

interface TagData {
  [key: string]: Post[];
}

export function generateTags(): TagData {
  const contentDir = path.resolve(__dirname, "../../blog");
  const tags: TagData = {};

  const posts = walkFiles<Post>({
    contentDir,
    processFile: (filePath, content, { data }) => {
      if (!data.tags || !Array.isArray(data.tags)) {
        return null;
      }

      const post = {
        title: data.title || path.basename(filePath).replace(/\.md$/, ""),
        date: formatDate(data.date || fs.statSync(filePath).birthtime),
        url:
          "/" +
          path
            .relative(path.resolve(__dirname, "../.."), filePath)
            .replace(/\.md$/, ""),
        tags: data.tags,
      };

      // 将文章添加到对应的标签集合中
      data.tags.forEach((tag: string) => {
        if (!tags[tag]) {
          tags[tag] = [];
        }
        tags[tag].push(post);
      });

      return post;
    },
  });

  // 对每个标签下的文章按日期排序
  Object.keys(tags).forEach((tag) => {
    tags[tag].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  // 对标签进行字母顺序排序
  const sortedTags: TagData = {};
  Object.keys(tags)
    .sort()
    .forEach((tag) => {
      sortedTags[tag] = tags[tag];
    });

  return sortedTags;
}
