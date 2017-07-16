{select} = require 'd3-selection'
{json} = require 'd3-request'
{nest} = require 'd3-collection'

scalar = 5

createAssetCatalog = (d)->
  console.log "Creating asset catalog"
  el = select @
  el.attr 'class', 'asset-catalog'
    .classed 'collapse', d.values.length == 1
    .selectAll 'div'
    .data d.values
    .enter()
    .append 'div'
    .each createAsset

createAsset = (d)->
  el = select @
  el.attr 'class','asset'
  el.append 'div'
    .attr 'class', 'swatch'
    .style 'background-image', "url(assets/png/#{d.name}.png)"
    .style 'background-size', "#{d.size.width/scalar}px #{d.size.height/scalar}px"
  h = el.append 'div'
    .attr 'class','info'
  h.append 'h4'
    .text d.name
  if d.note?
    el.classed 'annotated', true
    h.append "p"
      .attr 'class','note'
      .text d.note

processSections = (sections, assets)->
  sections.map (section)->
    range = section.range or [
      section.series, section.series+99]
    inSeries = (d)=>
      range[0] <= d.key < range[1]

    filteredAssets = assets.filter inSeries
    if not section.sections?
      section.children = filteredAssets
    else
      section.children = processSections section.sections, filteredAssets
      delete section.sections
    section.type = 'section'
    return section

createSection = (level)->(d)->
  el = select @
  h = el.append 'div'
    .attr 'class', 'body-text'
  h.append "h#{level+1}"
    .text d.id
  if d.series?
    h.append 'p'
      .attr 'class', 'series'
      .text "Series #{d.series}"

  cc = el.append 'div'
    .attr 'class', 'children'

  children = cc.selectAll 'div'
    .data d.children
    .enter()
    .append 'div'

  if d.children[0].children?
    children.each createSection(level+1)
  else
    cc.classed 'asset-container', true
    children.each createAssetCatalog

createSymbols = (data)->

  assets = nest()
        .key (d)->d.id
        .entries(data.assets)
  assets.forEach (d)->d.key = parseInt d.key

  sections = processSections data.structure, assets
  console.log sections

  sel = select "#patterns"
    .selectAll 'div.section'
    .data sections

  sel.enter()
    .append 'div'
    .attr 'class', 'section'
    .each createSection(1)

json 'data.json', createSymbols
