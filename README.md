# Map with ability to draw rectangles and polygons

## Notes

- creating rectangles and polygons - Polygons currently limited for 4 points to simplify implementation. The better implementation would be to allow as many points user clicked and finish creating object when last point close enough to begin point - make it bind to it (close polygon).
- implemented zoom for map - controlled by buttons. Better implementation would be zoom on scroll event. Added restriction for dragging map image - viewport bound to image.
- map image too big - which allows to see better quality on zoom but bad for performance - better implementation is to use tiles of images and load them when they in viewport
- saving shapes - currently after creation shape disappears and then appears when saved - better to make optimistic update of shapes data or leave creation shape visible until data saved.
- loading states and error handling not implemented
- updating shapes - backend api not implemented. For updating rectangle shape Transformer from konva is ok, but for polygon would be better to allow modify points. Also dragging shapes on edit not implemented - only resizing.
- Delete shape - active in editMode.
- Mobx subclassing - subclassing is supported with limitations - can't override field declarations.
- map image link currently hardcoded

## Technologies

- Mobx
- React
- msw
- konva
- ts
- tailwindcss
