/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import { select } from 'd3-selection';
import { json } from 'd3-request';
import { nest } from 'd3-collection';
import { throttle } from 'underscore';

const scalar = 5;
const scrollPadding = 200;

const loadBackgroundIfVisible = function(name){
  if (this.style.backgroundImage) { return; }
  const {bottom,right, top, left} =  this.getBoundingClientRect();
  if (!(bottom >= 0)) { return; }
  if (!(right >= 0)) { return; }
  if (!(top <= ((window.innerHeight+scrollPadding) || document.documentElement.clientHeight))) { return; }
  if (!(left <= (window.innerWidth || document.documentElement.clientWidth))) { return; }
  return this.style.backgroundImage = `url('assets/png/${name}.png')`;
};

const createAssetCatalog = function(d){
  console.log("Creating asset catalog");
  const el = select(this);
  return el.attr('class', 'asset-catalog')
    .classed('collapse', d.values.length === 1)
    .selectAll('div')
    .data(d.values)
    .enter()
    .append('div')
    .each(createAsset);
};

var createAsset = function(d){
  // Don't set up background image right yet
  const el = select(this);
  el.attr('class','asset');
  el.append('div')
    .datum(d.name)
    .attr('class', 'swatch')
    .style('background-size', `${d.size.width/scalar}px ${d.size.height/scalar}px`);
  const h = el.append('div')
    .attr('class','info');
  h.append('h4')
    .text(d.name);
  if (d.note != null) {
    el.classed('annotated', true);
    return h.append("p")
      .attr('class','note')
      .text(d.note);
  }
};

var processSections = (sections, assets) => sections.map(function(section){
  const range = section.range || [
    section.series, section.series+99];
  const inSeries = d=> {
    return range[0] <= d.key && d.key < range[1];
  };

  const filteredAssets = assets.filter(inSeries);
  if ((section.sections == null)) {
    section.children = filteredAssets;
  } else {
    section.children = processSections(section.sections, filteredAssets);
    delete section.sections;
  }
  section.type = 'section';
  return section;
});

var createSection = level => (function(d) {
  const el = select(this);

  const h = el.append('div')
    .attr('class', 'body-text');
  h.append(`h${level+1}`)
    .text(d.id);
  if (d.series != null) {
    el.attr('id', `series-${d.series}`);

    h.append('p')
      .attr('class', 'series')
      .text(`Series ${d.series}`);
  }

  const cc = el.append('div')
    .attr('class', 'children');

  const children = cc.selectAll('div')
    .data(d.children)
    .enter()
    .append('div');

  if (d.children[0].children != null) {
    return children.each(createSection(level+1));
  } else {
    cc.classed('asset-container', true);
    return children.each(createAssetCatalog);
  }
});

const createSymbols = function(data){

  const assets = nest()
        .key(d => d.id)
        .entries(data.assets);
  assets.forEach(d => d.key = parseInt(d.key));

  const sections = processSections(data.structure, assets);

  console.log(sections);
  //# Create TOC ##
  const ul = select("ul#contents")
    .selectAll('li')
    .data(sections)
    .enter()
    .append('li')
    .append('a')
      .attr('href', d => `#series-${d.series}`)
      .text(d => d.id.slice(0, d.id.length-" patterns".length));

  const root = select("#patterns");

  const sel = root
    .selectAll('div.section')
    .data(sections);

  sel.enter()
    .append('div')
    .attr('class', 'section')
    .each(createSection(1));

  const loadBackgrounds = function() {
    console.log("Loading swatches");
    return root.selectAll('div.swatch')
      .each(loadBackgroundIfVisible);
  };

  loadBackgrounds();

  const listener = throttle(loadBackgrounds, 200, {leading: false});

  window.addEventListener('scroll', listener);
  return window.addEventListener('resize', listener);
};

json('data.json', createSymbols);

