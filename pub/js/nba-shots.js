(function() {
  $(function() {
    var labels;
    labels = {
      srim_fg: "At Rim",
      s3_9_fg: "3-9'",
      s10_15_fg: "10-15'",
      s16_23_fg: "16-23'",
      s3_fg: "3pt",
      srim_fga: "At Rim",
      s3_9_fga: "3-9'",
      s10_15_fga: "10-15'",
      s16_23_fga: "16-23'",
      s3_fga: "3pt"
    };
    return $.getJSON('pub/data/shot-totals.json', function(data) {
      var barcnt, groups, h, keys, legend, lrw, lw, pad, ranks, rules, sort, teams, totals, vis, w, x1, x2, x3, y;
      keys = ['srim_fg', 's3_9_fg', 's10_15_fg', 's16_23_fg', 's3_fg'];
      totals = [];
      _.each(data, function(team) {
        return _.each(keys, function(k) {
          return totals.push(team[k]);
        });
      });
      w = 1300;
      h = 300;
      pad = 30;
      lw = 300;
      lrw = 10;
      teams = d3.entries(data);
      barcnt = d3.range(5);
      y = d3.scale.linear().domain([0, d3.max(totals)]).range([h, 0]);
      x1 = d3.scale.ordinal().domain(d3.range(teams.length)).rangeBands([0, w], .1);
      x2 = d3.scale.ordinal().domain(barcnt).rangeRoundBands([0, x1.rangeBand()], .4);
      x3 = d3.scale.ordinal().domain(barcnt).rangeRoundBands([0, lw], .2);
      vis = d3.select('#chart').attr('style', "margin: 0 auto; width: " + (w + (pad * 2)) + "px").append('svg:svg').attr('width', w + (pad * 2)).attr('height', h + (pad * 2)).append('svg:g').attr('transform', "translate(" + pad + "," + pad + ")");
      groups = vis.selectAll('g.team').data(teams).enter().append('svg:g').attr('transform', function(d, i) {
        return "translate(" + (x1(i)) + ", 0)";
      }).attr('class', function(d) {
        return "" + d.key + " team";
      });
      groups.selectAll('rect').data(function(d) {
        return _.map(keys, function(k) {
          return {
            k: k,
            v: d.value[k]
          };
        });
      }).enter().append('svg:rect').attr('transform', function(d, i) {
        return "translate(" + (x2(i)) + ", 0)";
      }).attr('width', x2.rangeBand()).attr('height', 0).attr('y', h).attr('class', function(d) {
        return "" + d.k + " glow";
      }).transition().delay(function(d, i) {
        return i * 5;
      }).attr('height', function(d) {
        return h - y(d.v);
      }).attr('y', function(d) {
        return y(d.v);
      });
      groups.append('svg:text').text(function(d) {
        return d.key.toUpperCase();
      }).attr('class', 'lbl').attr('text-anchor', 'middle').attr('x', x2.rangeBand() * keys.length).attr('y', h).attr('dy', 15);
      ranks = groups.append('svg:text').attr('x', x2.rangeBand() * keys.length).attr('y', h).attr('dy', 30).attr('text-anchor', 'middle');
      rules = vis.selectAll('g.rule').data(y.ticks(6)).enter().append('svg:g');
      rules.append('svg:line').attr('x1', function() {
        return 0;
      }).attr('x2', function() {
        return w;
      }).attr('y1', function(d) {
        return y(d);
      }).attr('y2', function(d) {
        return y(d);
      }).attr('class', 'rule');
      rules.append('svg:text').attr('y', y).attr("dy", ".2em").attr('x', 0).attr('class', 'vlbl').attr('text-anchor', 'end').text(function(d) {
        return d;
      });
      legend = vis.append('svg:g').attr('transform', "translate(" + ((w - lw) / 2) + ", -10)").attr('class', 'legend').selectAll('g.l').data(keys).enter().append('svg:g').attr('transform', function(d, i) {
        return "translate(" + (x3(i)) + ", 0)";
      }).attr('class', 'l').on('click', function(d) {
        return sort(d);
      });
      legend.append('svg:rect').attr('width', lrw).attr('height', lrw).attr('class', function(d) {
        return d;
      });
      legend.append('svg:text').attr('dx', lrw + 6).attr('dy', lrw / 2 + 3).text(function(d) {
        return labels[d];
      });
      return sort = function(f) {
        var steams, tgroups;
        steams = _(teams).chain().sortBy(function(d) {
          return d.value[f];
        }).map(function(t) {
          return t.key;
        }).reverse().value();
        tgroups = vis.selectAll('g.team');
        tgroups.transition().duration(300).delay(function(d, i) {
          return i * 5;
        }).attr('transform', function(d) {
          var idx;
          idx = _.indexOf(steams, d.key);
          return "translate(" + (x1(idx)) + ", 0)";
        });
        tgroups.selectAll('rect').transition().delay(function(d, i) {
          return i * 5;
        }).attr('transform', function(d, i) {
          return "translate(" + (x2.rangeBand() * keys.length) + ", 0)";
        }).attr('height', function(d) {
          var k;
          k = this.getAttribute('class');
          if (f === k) {
            return h - y(d.v);
          } else {
            return 0;
          }
        });
        return ranks.text(function(d) {
          return "#" + (_.indexOf(steams, d.key) + 1);
        }).attr('class', 'rnk');
      };
    });
  });
}).call(this);
