(function() {
  $(function() {
    return $.getJSON('pub/data/football-recruits-2006-2011.json', function(colleges) {
      var g, h, levels, pb, pl, pr, pt, rules, stars, vis, w, x, y, z, _ref;
      levels = ['two', 'three', 'four', 'five'];
      colleges = _.sortBy(colleges, function(d) {
        return d.value.four + d.value.five;
      }).reverse().slice(0, 100);
      stars = d3.layout.stack()(levels.map(function(level) {
        return colleges.map(function(d) {
          return {
            x: d._id,
            y: +d.value[level]
          };
        });
      }));
      _ref = [20, 20, 140, 50], pt = _ref[0], pr = _ref[1], pb = _ref[2], pl = _ref[3];
      w = 5000;
      h = 600;
      x = d3.scale.ordinal().domain(stars[0].map(function(d) {
        return d.x;
      })).rangeRoundBands([0, w - pl - pr], 0.2);
      y = d3.scale.linear().range([0, h - pt - pb]).domain([
        0, d3.max(stars[stars.length - 1], function(d) {
          return d.y0 + d.y;
        })
      ]);
      z = d3.scale.ordinal().range(["#1e1e1e", "#262626", "#0e4d00", "green"]);
      vis = d3.select('#chart').append('svg:svg').attr('width', w).attr('height', h).append('svg:g').attr('transform', "translate(" + pl + ", " + (h - pb) + ")");
      g = vis.selectAll('g.bar').data(stars).enter().append('svg:g').attr('class', 'stars').style('fill', function(d, i) {
        return z(i);
      }).style('stroke', function(d, i) {
        return d3.rgb(z(i)).brighter(0.5);
      });
      g.selectAll('rect').data(Object).enter().append('svg:rect').attr('x', function(d) {
        return x(d.x);
      }).attr('y', function(d) {
        return -y(d.y0) - y(d.y);
      }).attr('height', function(d) {
        return y(d.y);
      }).attr('width', x.rangeBand());
      g.selectAll('nums').data(Object).enter().append('svg:text').style('fill', '#fff').style('fill-opacity', '0.2').style('stroke-width', 0).style('visibility', function(d) {
        if (d.y >= 5) {
          return '';
        } else {
          return 'hidden';
        }
      }).attr('x', function(d) {
        return x(d.x);
      }).attr('y', function(d) {
        return -y(d.y0) - y(d.y);
      }).attr('dy', function(d) {
        return y(d.y) / 2;
      }).attr('dx', (x.rangeBand() / 2) - 5).text(function(d) {
        return d.y;
      });
      vis.selectAll('text.label').data(x.domain()).enter().append('svg:text').attr('class', 'label').attr('text-anchor', 'bottom').text(function(d, i) {
        return "" + (i + 1) + ". " + d;
      }).attr('transform', function(d) {
        return "translate(" + (x(d) + (x.rangeBand() / 2 + 2)) + ", " + (this.getBBox().width + 40) + ") rotate(-90)";
      });
      d3.select('body').selectAll('.logo').data(x.domain()).enter().append('span').attr('class', 'logo').attr('data-team', function(d) {
        return d.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)|&/g, '');
      }).style('position', 'absolute').style('top', function(d) {
        return "" + (pt + h + 51) + "px";
      }).style('left', function(d) {
        return "" + (pl + x(d) + x.rangeBand() / 2 - 12) + "px";
      });
      rules = vis.selectAll('g.rule').data(y.ticks(15)).enter().append('svg:g').attr('class', 'rule').attr('transform', function(d) {
        return "translate(0, " + (-y(d)) + ")";
      });
      rules.append('svg:line').attr('x2', w - pl - pr);
      rules.append('svg:text').attr('x', -25).attr('dy', '0.3em').text(function(d) {
        return d;
      });
      return levels.forEach(function(l, i) {
        var val, _i;
        val = "S";
        for (_i = 0; 0 <= i ? _i <= i : _i >= i; 0 <= i ? _i++ : _i--) {
          val += "S";
        }
        return $('#legend').prepend($('<li />').css('color', z(i)).addClass('star').text(val));
      });
    });
  });
}).call(this);
