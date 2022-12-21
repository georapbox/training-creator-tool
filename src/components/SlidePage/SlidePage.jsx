import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { AaShortLogo } from './../../icons/AaShortLogo';
import { BottomCornerDesign } from './../../icons/BottomCornerDesign';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import { Link } from 'gatsby';
deckDeckGoHighlightElement();

export const SlidePage = ({ body }) => {
  return (
    <div className="slide-page">
      <AaShortLogo className="logo" />
      <div className="content-slide">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          // eslint-disable-next-line react/no-children-prop
          children={body?.replaceAll('﻿', '')}
          components={{
            h1: ({ children }) => <h1>{children}</h1>,
            h3: ({ children }) => <h3>{children}</h3>,
            h4: ({ children }) => <h4>{children}</h4>,
            ul: ({ children }) => <ul>{children}</ul>,
            p: ({ children }) => {
              if (children && children.length === 1 && children[0].type === 'img') {
                return <div className="image-container">{children}</div>;
              }
              return <p>{children}</p>;
            },
            iframe: (props) => {
              const moreProps = {};

              if (props.src.includes('https://codesandbox.io/s/')) {
                moreProps.sandbox = 'allow-modals allow-forms allow-popups allow-scripts allow-same-origin';
                moreProps.title = 'sandbox_' + props.src.split('https://codesandbox.io/s/')[1];
              }
              return <iframe title="iframe" {...{ ...props, node: undefined }} {...moreProps} />;
            },
            a: (props) => {
              // NOTE if is is internal Link
              if (props?.href?.startsWith('/')) {
                return <Link to={props.href}>{props.children}</Link>;
              }
              const moreProps = {};

              moreProps.target = '_blank';
              moreProps.rel = 'noreferrer';

              return (
                <a {...{ ...props, node: undefined }} {...moreProps}>
                  {props.children}
                </a>
              );
            },
            table: (props) => <table className="table">{props.children}</table>,
            // FIXME The code logic should work without having to do the following.
            code: ({ className, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match?.[1]?.trim() || '';

              if (!language) {
                return <code {...{ ...props, node: undefined }} />;
              }

              const highlightedLinesString = className
                ?.split(language)?.[1]
                ?.replace('{', '')
                ?.replace('}', '')
                ?.trim()
                ?.replaceAll(' ', '')
                ?.replaceAll(',', ', ');

              return (
                <deckgo-highlight-code
                  language={language}
                  line-numbers=""
                  class="deckgo-highlight-code-carbon deckgo-highlight-code-theme-dracula hydrated styled-code"
                  terminal="carbon"
                  theme="dracula"
                  highlight-lines={highlightedLinesString}
                >
                  <code slot="code">{props.children}</code>
                </deckgo-highlight-code>
              );
            }
          }}
        />
      </div>

      <BottomCornerDesign className="bottom-corner-design" />
    </div>
  );
};
