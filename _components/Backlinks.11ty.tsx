import React, { useState } from "react";
import { EleventyData } from "./eleventyTypes.11ty";
import { twMerge } from "tailwind-merge";

type LinkEntry = {
  slug: string;
  path: string;
};

type LinkMapValue = {
  path: string;
  slug: string;
  outboundLinks: LinkEntry[];
  inboundLinks: LinkEntry[];
};

export type LinkMap = Record<string, LinkMapValue>;

const Link = (props: LinkEntry) => (
  <li>
    <a href={props.path}>{props.slug}</a>
  </li>
);

const LinkList = (props: { title: string; links?: LinkEntry[] }) => (
  <>
    <h3>{props.title}</h3>
    {props.links && props.links.length ? (
      <ul>
        {props.links.map((link) => (
          <Link key={link.slug} {...link} />
        ))}
      </ul>
    ) : (
      <span className="italic">No links found</span>
    )}
  </>
);

export const Backlinks = (props: EleventyData & { className?: string }) => {
  const fileSlug = props.page.fileSlug;
  const linkMap: LinkMap | undefined = props.collections.linkMap;

  const currentLink = linkMap?.[fileSlug];

  const [counter, setCounter] = useState(0);

  return (
    <div className={twMerge("prose", props.className)}>
      <LinkList title="Outgoing Links" links={currentLink?.outboundLinks} />
      <LinkList title="Incoming Links" links={currentLink?.inboundLinks} />
    </div>
  );
};
