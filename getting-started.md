---
layout: default
title: Dragoman
---

<div class="post">
  <h1>Getting Started</h1>
	<p>Define your paths, and the languages you intend to build your applications in the ./config.json file (language selection in progress).</p>
  <p>
    <code>$ gulp dragoman-[options]</code>
  </p>

	<h3>Options</h3>
	<ul>
		<li>[default] - translates tokens to all languages</li>
    <li>scss</li>
    <li>sass</li>
    <li>less</li>
    <li>stylus</li>
    <li>android</li>
    <li>ios</li>
    <li>[option]-icons - generates icons along with language translation </li>
    <li>web - translates all web languages & generates icons </li>
    <li>mobile - translates android, ios, & generates icons for both </li>
  	</ul>

    <hr/>

    <h3>Default Design Tokens</h3>
    <ul>
      <li>Colors</li>
      <li>Fonts</li>
      <li>Spacing</li>
      <li>Iconography</li>
      <li>Typography</li>
    </ul>
    <p>These are the core design assets that need to be controlled cross-platform variables. You can add more tokens as you need; simply include them in the 'styles.yml' token, which includes all partials for an easy import file for your CSS stylesheets.</p>

    <h3>Writing Variables in Tokens:</h3>
    <p>When using a variable as a value, use % prefix. Defining a variable (as the key), no prefix is necessary.</p>
    <p>
      <code>my-color: "%color-primary"</code>
    </p>
</div>
