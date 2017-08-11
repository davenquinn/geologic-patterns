<div id='leader'>
![A geologic fantasy rendered in Procreate using FGDC pattern brushes](leader.png)

<ul class='quick-links'>
  <li><a href='#pattern-reference'>Map patterns</a></li>
  <li><a href='#series-600'>Lithology patterns</a></li>
  <li><a href='https://github.com/davenquinn/geologic-patterns'><i class='icon-github'></i> Github</a></li>
  <li><a href='https://pubs.usgs.gov/tm/2006/11A02/'>FGDC standard</a></li>
</ul>
</div>

<div id="main-content">

<section>

The [FGDC Digital Cartographic Standard for Geologic Map
Symbolization][fgdc_std], released in 2006, provides guidance and
assets for the preparation of geologic maps. It includes a large array
of reference styles for geologic linework and map symbology.

This repository contains the FGDC library of 480 map and lithologic
patterns extracted to
SVG and PNG, for use on the modern web. This can be paired with other collections of
linework and geologic symbols for the construction of slick geologic maps and
stratigraphic columns.


### Credits

<ul class='author-date'>
  <li>Created by <a class='author' href="http://davenquinn.com">Daven Quinn</a> on <span class='date'>July 15, 2017</span></li>
  <li>Fixes by Kelsey Ciarrocca at the USGS integrated on
   <span class='date'>August 10, 2017</span></li>
  <li>Valuable input and guidance from Chris Garrity,  Taryn Lindquist,
and David Soller at the USGS</li>

</ul>

</section>

## Motivation

<section>

The FGDC manual is a work of thoughtful cartographic design,
and the symbology is unmatched in quality and breadth.
Patterns are [available](https://pubs.usgs.gov/tm/2006/11A02/) as
`.eps` and `.pdf` files, and a subset is packaged as an ESRI ArcGIS `*.style`.
However, the original formats are tied to the Adobe
and ESRI ecosystems, and are increasingly dated -- recent
versions of Adobe Illustrator CC have difficulty importing pattern
swatches from the files provided on the FGDC site.

Here, the patterns are repackaged into modern formats
which can be used on the web, dependably
read in virtually all GIS and graphics software,
and flexibly incorporated into derived products for
specific tasks. Along these lines, this package includes
a [catalog of brushes][brushes] for the iPad drawing app
[*Procreate*][procreate], which supports the sketching
of geologic maps and stratigraphic columns.

</section>

## Usage

<section>

This repository includes the complete set of FGDC
fill patterns, usable within modern web standards.
The SVG files are lossless vectors preserving the full
fidelity of the original patterns, and the PNGs are rasterized versions
that sacrifice some fidelity for flexibility and ease of use. Paletted PNGs, with
lower fidelity and file size, are also provided.

Using SVGs is a *lot more* rendering work for the browser. Thus,
the **png** versions of these symbols are recommended for most
uses. For some uses, it may be desirable to downsample the images
somewhat as well.

Images are addressable with the `id` (shown in bold beneath each symbol
below). For instance, `102-DO.png` or `102-DO.svg` would work. These patterns form
seamless repeating backgrounds using CSS (both within HTML and SVG):

```css
div.sandstone {
  background: url('assets/png/102-DO.png');
  background-size: 100px 100px;
}
```

In the future I may add a CSS stylesheet and/or Javascript API that can be used to quickly
use the symbols based on common lithology names.

### Procreate brushes

This product has been processed into a [set of brushes][brushes] for the iPad drawing
program **Procreate**, enabling the drawing of symbology into
stratigraphic columns and maps. These brushes can be individually
imported into Procreate and used from the *Imported Brushes* panel. Some
limitations:

- The pixel dimensions of the pattern stamp can only be changed by
  modifying the brush, using the *Zoom* and *Scale* settings in the
  *Grain* panel of the brush properties window.
- The brushes can only be generated on MacOS, due to the platform-specific
  `plutil` executable.

</section>

## Prior art

<section>

- The [FGDC standards](https://ngmdb.usgs.gov/fgdc_gds/geolsymstd.php), of course!
- Ryan Clark's [`geocarto`][geocarto], which
  implements a subset of the FGDC standard focused on linework symbols for
  CartoCSS and Mapnik
- [Geologic symbols for QGIS](http://geo.distortions.net/2010/12/geologic-symbology-for-qgis.html)
  from Ryan Mikulovsky.
- [Planetary geology FGDC symbols](https://github.com/afrigeri/geologic-symbols) from Andrea Nass and Alessandro Frigeri
- *Taconic Musings'* exploration of [geologic mapping in
  QGIS](http://gmcgeology.blogspot.com/2014/05/creating-geologic-maps-in-qgis-strike.html)
- UI icon sets such as [Font Awesome](https://font-awesome.io)

There is some overlap between this project and other distillations shown above, but most prior
compilations are focused on linework symbols. It could be useful to bring some of these under the same umbrella for simplicity,
or have a separate parallel repository that is the canonical source of linework symbology.

</section>

## Next steps

<section>

I would like to use this repository as the centerpiece of an
authoritative collection of resources for geologic symbology. This could
mean several things:

- Add aliases to commonly used lithologic patterns
- Add a mechanism for dealing with FGDC colors
- Incorporating the linework and point symbology part of the FGDC standards
- Add derived products that can speed adoption of styles on multiple
  platforms
    - QGIS styles
    - CSS stylesheet
    - SVG pattern objects
    - CartoCSS styles

The FGDC standard is comprehensive, but if there is community interest,
other symbology could be incorporated into the set.

[fgdc_std]: https://ngmdb.usgs.gov/fgdc_gds/geolsymstd/download.php
[geocarto]: https://github.com/rclark/geocarto
[procreate]: https://procreate.art
[brushes]: https://github.com/davenquinn/geologic-patterns/releases/latest

</section>

</div>

# Pattern reference

## Index

<ul id="contents" class='quick-links'></ul>

<div id=patterns></div>
