export interface BlockMetadata {
  id: string;
  title: string;
  description: string;
  order: number;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  filename: string;
  order: number;
}

export interface BlockContent {
  metadata: BlockMetadata;
  sections: Map<string, string>;
}
