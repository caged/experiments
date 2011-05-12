$ ->
  labels = 
    srim_fg: "At Rim"
    s3_9_fg: "3-9'"
    s10_15_fg: "10-15'"
    s16_23_fg: "16-23'"
    s3_fg: "3pt"
    srim_fga: "At Rim"
    s3_9_fga: "3-9'"
    s10_15_fga: "10-15'"
    s16_23_fga: "16-23'"
    s3_fga: "3pt"
    
  $.getJSON 'pub/data/shot-totals.json', (data) ->
    keys = ['srim_fg', 's3_9_fg', 's10_15_fg', 's16_23_fg', 's3_fg']
    # keys = ['srim_fga', 's3_9_fga', 's10_15_fga', 's16_23_fga', 's3_fga']
    
    # Collect totals to find the overall max
    totals = []
    _.each data, (team) -> _.each keys, (k) -> totals.push(team[k])
            
    w = 1300
    h = 300
    pad = 30
    lw = 300 # label width
    lrw = 10 # label rect width
    teams = d3.entries(data)
    barcnt = d3.range(5)
    
    y  = d3.scale.linear().domain([0, d3.max(totals)]).range [h, 0]
    x1 = d3.scale.ordinal().domain(d3.range(teams.length)).rangeBands([0, w], .1)
    x2 = d3.scale.ordinal().domain(barcnt).rangeRoundBands([0, x1.rangeBand()], .4)
    x3 = d3.scale.ordinal().domain(barcnt).rangeRoundBands([0, lw], .2)
    
    vis = d3.select('#chart')
      .attr('style', "margin: 0 auto; width: #{w + (pad * 2)}px")
    .append('svg:svg')
      .attr('width', w + (pad * 2))
      .attr('height', h + (pad * 2))
    .append('svg:g')
      .attr('transform', "translate(#{pad},#{pad})")
    
    # TEAM GROUPS  
    groups = vis.selectAll('g.team')
      .data(teams)
    .enter().append('svg:g')
      .attr('transform', (d, i) -> "translate(#{x1(i)}, 0)")
      .attr('class', (d) -> "#{d.key} team")
    
    # GROUP BARS
    groups.selectAll('rect')
      .data((d) -> _.map(keys, (k) -> k: k, v: d.value[k]))
    .enter().append('svg:rect')
      .attr('transform', (d, i) -> "translate(#{x2(i)}, 0)")
      .attr('width', x2.rangeBand())
      .attr('height',  0)
      .attr('y', h)
      .attr('class', (d) -> d.k)
    .transition()
      .delay((d, i) -> i * 5)
      .attr('height', (d) -> h - y(d.v))
      .attr('y', (d) -> y(d.v))
    
    # BOTTOM LABELS    
    groups.append('svg:text')
      .text((d) -> d.key.toUpperCase())
      .attr('class', 'lbl')
      .attr('text-anchor', 'middle')
      .attr('x', x2.rangeBand() * keys.length)
      .attr('y', h)
      .attr('dy', 15)
    
    # BOTTOM RANK LABEL
    ranks = groups.append('svg:text')
      .attr('x', x2.rangeBand() * keys.length)
      .attr('y', h)
      .attr('dy', 30)
      .attr('text-anchor', 'middle')
      # .text((d, i) -> i + 1)
    
    # HORIZONTAL RULE GROUPS
    rules = vis.selectAll('g.rule')
      .data(y.ticks(6))
    .enter().append('svg:g')
    
    # HORIZONTAL RULES
    rules.append('svg:line')
      .attr('x1', -> 0)
      .attr('x2', -> w)
      .attr('y1', (d) -> y(d))
      .attr('y2', (d) -> y(d))
      .attr('class', 'rule')
  
    # HORIZONTAL RULE LABELS
    rules.append('svg:text')
      .attr('y', y)
      .attr("dy", ".2em")
      .attr('x', 0)
      .attr('class', 'vlbl')
      .attr('text-anchor', 'end')
      .text((d) -> d)
    
    # LEGEND
    legend = vis.append('svg:g')
      .attr('transform', "translate(#{(w - lw) / 2}, -10)")
      .attr('class', 'legend').selectAll('g.l')
      .data(keys)
    .enter().append('svg:g')
      .attr('transform', (d, i) -> "translate(#{x3(i)}, 0)")
      .attr('class', 'l')
      .on('click', (d) -> sort(d))
      
    legend.append('svg:rect')
        .attr('width', lrw)
        .attr('height', lrw)
        .attr('class', (d) -> d)
    
    legend.append('svg:text')
      .attr('dx', lrw + 6)
      .attr('dy', lrw / 2 + 3)
      .text((d) -> labels[d])

    # SORT GROUPS
    sort = (f) ->
      steams = _(teams).chain()
        .sortBy((d) -> d.value[f])
        .map((t) -> t.key)
        .reverse()
        .value()
      
      tgroups = vis.selectAll('g.team')
      tgroups.transition()
          .duration(300)
          .delay((d, i) -> i * 5)
          .attr('transform', (d) -> 
            idx = _.indexOf(steams, d.key)
            "translate(#{x1(idx)}, 0)")
      
      tgroups.selectAll('rect')
        .transition()
        .delay((d, i) -> i * 5)
        .attr('transform', (d, i) -> "translate(#{x2.rangeBand() * keys.length}, 0)")
        .attr('height', (d) -> 
          k = this.getAttribute('class')
          if f == k then h - y(d.v) else 0)
          
      ranks.text((d) -> "##{_.indexOf(steams, d.key) + 1}")
        .attr('class', 'rnk')
      