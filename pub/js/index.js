(function() {
  $(function() {
    var cc, cols, grid, h, rc, rows, w, x, y;
    w = 800;
    h = 800;
    rc = 5;
    cc = 5;
    y = d3.scale.linear().domain([0, rc]).range([h, 0]);
    x = d3.scale.linear().domain([0, cc]).range([0, w]);
    grid = d3.select('#grid').append('svg:svg').attr('width', w).attr('height', h);
    rows = grid.selectAll('g.row').data(y.ticks(rc)).enter().append('svg:g');
    rows.append('svg:line').attr('x1', function(d) {
      return x(d);
    }).attr('x2', function(d) {
      return x(d);
    }).attr('y1', function(d) {
      return 0;
    }).attr('y2', function(d) {
      return 0;
    }).attr('class', function(d, i) {
      if (i === 0) {
        return 'hide';
      } else {
        return 'rule';
      }
    }).transition().delay(function(d, i) {
      return i * 150;
    }).attr('y2', function(d) {
      return h;
    });
    cols = grid.selectAll('g.row').data(y.ticks(cc)).enter().append('svg:g');
    return cols.append('svg:line').attr('x1', function(d) {
      return 0;
    }).attr('x2', function(d) {
      return 0;
    }).attr('y1', function(d) {
      return y(d);
    }).attr('y2', function(d) {
      return y(d);
    }).attr('class', function(d, i) {
      if (i === 0) {
        return 'hide';
      } else {
        return 'rule';
      }
    }).transition().delay(function(d, i) {
      return i * 150;
    }).attr('x2', function(d) {
      return w;
    });
  });
}).call(this);
