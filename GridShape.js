let Shapes = {};
class GridShape {
    ComputeCoordinate (colIdx, rowIdx, gap, width, height) {
        return {
            x: ((colIdx +1) *gap) +(colIdx *width),
            y: ((rowIdx +1) *gap) +(rowIdx *height)
        };
    }
}

export {Shapes, GridShape as default}