if (typeof window !== 'undefined') {
  const style = document.createElement('style');

  style.innerHTML = /* css */ `
    /* https://github.com/netlify/netlify-cms/issues/5092 */
    [data-slate-editor] {
        -webkit-user-modify: read-write !important;
    }
  `;

  document.head.appendChild(style);

  console.log('Style added');
}
