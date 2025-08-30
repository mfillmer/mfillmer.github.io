export type LinkEntry = {
  label: string;
  target: string;
};

export type LinkMapValue = LinkEntry & {
  outboundLinks: LinkEntry[];
  inboundLinks: Record<string, LinkEntry>;
};

export type LinkMap = Record<string, LinkMapValue>;
