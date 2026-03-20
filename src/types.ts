export type SkillScriptType =
  | "javascript"
  | "typescript"
  | "python"
  | "shell"
  | "ruby"
  | "other";

export type SkillWarningCode =
  | "missing_frontmatter"
  | "invalid_yaml_frontmatter"
  | "missing_required_meta_name"
  | "missing_required_meta_description"
  | "invalid_meta_name"
  | "invalid_meta_description"
  | "skill_md_content_size_limit_exceeded"
  | "resource_read_error";

export interface SkillWarning {
  code: SkillWarningCode;
  message: string;
}

export interface SkillScript {
  path: string;
  type: SkillScriptType;
}

export type SkillMeta = Record<string, unknown> & {
  name: string;
  description: string;
};

export interface Skill {
  meta: SkillMeta;
  content: string;
  references: string[];
  scripts: SkillScript[];
  skillPath: string;
  skillFilePath: string;
}

export interface InvalidSkill {
  meta: Record<string, unknown>;
  content: string;
  references: string[];
  scripts: SkillScript[];
  warnings: SkillWarning[];
  skillPath: string;
  skillFilePath: string;
}

export interface LoadSkillsConfig {
  paths?: string[];
  recursive?: boolean;
  cwd?: string;
}

export type LoadSkillsPathError = "path_not_found" | "path_not_directory";

export interface LoadSkillsPathReport {
  inputPath: string;
  resolvedPath: string;
  count: number;
  skillNames: string[];
  error?: LoadSkillsPathError;
}

export interface IgnoredDuplicateSkill {
  skillName: string;
  normalizedSkillName: string;
  ignoredSkillPath: string;
  ignoredSkillFilePath: string;
  ignoredFromInputPath: string;
  keptSkillPath: string;
  keptSkillFilePath: string;
  keptFromInputPath: string;
}

export interface LoadSkillsReport {
  paths: LoadSkillsPathReport[];
  ignoredDuplicates: Record<string, IgnoredDuplicateSkill[]>;
  invalidSkills: InvalidSkill[];
}

export interface LoadSkillsResult {
  skills: Record<string, Skill>;
  report: LoadSkillsReport;
}

export interface ParseSkillResult {
  meta: Record<string, unknown>;
  content: string;
  warnings: SkillWarning[];
}
