#!/usr/bin/env coffee

# This file runs with node > 7.6
# which has support for async/await

{readFileSync, writeFileSync} = require 'fs'
glob = require 'glob-promise'
path = require 'path'
{safeLoad} = require 'js-yaml'
sizeOf = require 'image-size'

outfile = process.argv[2]

read = (d)->readFileSync d, 'utf8'

imageSize = (im)->
  new Promise (res)->
    sizeOf im, (e,sz)->
      delete sz.type
      res(sz)

do ->

  asset_names = {}
  names = read 'names.txt'
    .split '\n'
    .map (line)->
      [id, string] = line.split '  '
      id = parseInt id
      asset_names[id] = string

  assets = await glob "../assets/png/*.png"
  assets = assets.map (fn)->
    size = await imageSize fn
    name = path.basename(fn,'.png')
    [id, colorway] = name.split '-'
    id = parseInt(id)
    note = asset_names[id]

    { id, colorway, name, note, size}

  assets = await Promise.all assets

  __colorOrder = 'K C M R B DO'.split(' ')
  colorOrder = (d)->
    __colorOrder.indexOf(d.colorway)

  assets.sort (a, b)->
    if a.id == b.id
      return colorOrder(a)-colorOrder(b)
    a.id - b.id

  structure = safeLoad read('data.yaml')

  data = {structure, assets}

  for asset in assets
    console.log asset

  _ = JSON.stringify(data)
  writeFileSync outfile, _, 'utf8'

