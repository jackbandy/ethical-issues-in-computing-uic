---
layout: page
title: Unessays
description: Unessay websites published by students in Ethical Issues in Computing (CS 377) at UIC.
---

<!-- NOTICE: This page was drafted by an LLM coding system. Review before relying on it. The list is built from docs/_data/unessays.csv. -->

Some students chose to make a website for their [unessay](../read-a-book/public-communication.html). Each site below is the student's own work, published with their permission. Want to add yours? See [how to publish your unessay](how-to-publish.html).

{% assign terms = site.data.unessays | group_by: "term" %}
{% for term in terms %}
<h2>{{ term.name }}</h2>
<ul>
{% for p in term.items %}
  {% assign book = p.book | strip %}
  <li><a href="{{ site.baseurl }}/unessays/{{ p.term }}/{{ p.slug }}/">{{ p.title }}</a> by {{ p.author }}{% if book != "" %}, on <em>{{ book }}</em>{% endif %}</li>
{% endfor %}
</ul>
{% endfor %}
