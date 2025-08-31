import React, { useState } from "react";
import { EleventyData } from "./eleventyTypes.11ty";
import { twMerge } from "tailwind-merge";
import { LinkEntry, LinkMap } from "../lib/wikilinks/types";

const Link = (props: LinkEntry) => (
  <li>
    <a href={props.target}>{props.label}</a>
  </li>
);

const LinkList = (props: { title: string; links?: LinkEntry[] }) => (
  <>
    <h3>{props.title}</h3>
    {props.links && props.links.length ? (
      <ul>
        {props.links.map((link) => (
          <Link key={link.target} {...link} />
        ))}
      </ul>
    ) : (
      <span className="italic">No entries</span>
    )}
  </>
);

export const Backlinks = (props: EleventyData & { className?: string }) => {
  const linkMapKey = props.page.filePathStem;
  const linkMap: LinkMap | undefined = props.collections.linkMap;

  const currentLink = linkMap?.[linkMapKey];

  return (
    <div className={twMerge("prose", props.className)}>
      <LinkList title="Outgoing Links" links={currentLink?.outboundLinks} />
      <LinkList
        title="Incoming Links"
        links={Object.values(currentLink?.inboundLinks ?? {})}
      />
    </div>
  );
};
