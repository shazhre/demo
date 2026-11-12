THE THREAD STORIES – HOMEPAGE (static HTML)
=============================================

How to view
-----------
Unzip the folder and double-click index.html. It opens in any browser.
An internet connection is needed only for the fonts (Google Fonts:
Cormorant Garamond and Jost); everything else is inside this folder.

Files
-----
index.html        Page structure and all fixed text
css/styles.css    All styles, colours and the responsive layout
js/main.js        Menus, category carousel, product cards, size selection,
                  add to bag, the mobile category menu and the quick-add sheet
images/           Product photos (resized for web) and the logo

Colours (top of css/styles.css)
-------------------------------
--accent  #B0126F  magenta: buttons, Sale, highlights
--teal    #0E6B6B  collection block, footer
--gold    #D4A017  "New" badges, gold buttons
--bg      #FFF8F5  page background
--ink     #24161F  text

Screen sizes
------------
1536px and wider   full desktop header (menu left, logo centred, icons right)
1024–1535px        same layout, slightly smaller menu text and logo
1024–1199px        the name beside the monogram is hidden to make room
under 1024px       tablet/mobile: centred logo and name only, bottom menu bar,
                   3 columns on tablet, 2 on phones, quick-add "+" button

Things to replace before going live (search the files for "[")
--------------------------------------------------------------
- Prices: OMR [PRICE] and OMR [SALE PRICE]
- Delivery offer amount: OMR [AMOUNT]
- Size chart measurements: [ ]
- [Collection name] and its description
- [Delivery time and fee], [Exchange policy]
- [WhatsApp number], [WhatsApp community invite link], [Email address]
- Product names in js/main.js are examples based on the photos
- "Only 2 left in …" and sold-out sizes are example stock data

Notes for the developer
-----------------------
- Homepage categories, products and menus are plain data arrays at the top of
  js/main.js (CATEGORIES, NEW_ARRIVALS, BEST_SELLERS, MENUS, RAIL). Replace
  them with data from your shop platform or admin panel.
- "Add to bag" only updates the bag count and shows a confirmation; connect it
  to your cart/checkout.
- Links to product pages, the bag, account, search and WhatsApp are "#"
  placeholders.
- Categories marked "Photo coming soon" have no photo yet: add an image file
  name in CATEGORIES / RAIL.
