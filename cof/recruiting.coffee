$ ->
    $.getJSON 'pub/data/football-recruits-2006-2011.json', (colleges) ->
      colleges = _.sortBy(colleges, (d) -> d.value.five + d.value.four).reverse()[0...100]
      stars = d3.layout.stack() ['two', 'three', 'four', 'five'].map (stars) ->
        colleges.map (d) ->  { x: d._id, y: +d.value[stars] }
      
      [pt, pr, pb, pl] = [20, 20, 100, 50]
      w = 5000
      h = 600

      x = d3.scale.ordinal().domain(stars[0].map((d) -> d.x)).rangeRoundBands([0, w - pl - pr], 0.2)
      y = d3.scale.linear().range([0, h - pt - pb]).domain([0, d3.max(stars[stars.length - 1], (d) -> d.y0 + d.y)])
      z = d3.scale.ordinal().range ["#151515", "#1e1e1e", "#0e4d00", "green"]

      
      vis = d3.select('#chart')
        .append('svg:svg')
          .attr('width', w )
          .attr('height', h)
        .append('svg:g')
          .attr('transform', "translate(#{pl}, #{h - pb})")

      # Bars and Groups
      g = vis.selectAll('g.bar')
        .data(stars)
      .enter().append('svg:g')
        .attr('class', 'stars')
        .style('fill', (d, i) -> z(i))
        .style('stroke', (d, i) -> d3.rgb(z(i)).brighter(0.5))
      
      g.selectAll('rect')
        .data(Object)
      .enter().append('svg:rect')
        .attr('x', (d) -> x(d.x))
        .attr('y', (d) -> -y(d.y0) - y(d.y))
        .attr('height', (d) -> y(d.y))
        .attr('width', x.rangeBand())
      
      # Numbers inside the rects
      g.selectAll('nums')
        .data(Object)
      .enter().append('svg:text')
        .style('fill', '#fff')
        .style('fill-opacity', '0.2')
        .style('stroke-width', 0)
        .style('visibility', (d) -> if d.y >= 5 then '' else 'hidden')
        .attr('x', (d) -> x(d.x))
        .attr('y', (d) -> -y(d.y0) - y(d.y))
        .attr('dy', (d) -> y(d.y) / 2)
        .attr('dx', (x.rangeBand() / 2) - 5)
        .text((d) -> d.y)
      
      # Labels
      vis.selectAll('text.label')
        .data(x.domain())
      .enter().append('svg:text')
        .attr('class', 'label')
        .attr('text-anchor', 'bottom')
        .text((d, i) -> "#{i+1}. #{d}")
        .attr('transform', (d) -> "translate(#{x(d) + (x.rangeBand() / 2)}, #{this.getBBox().width + 10}) rotate(-90)")
      
      # Y axis
      rules = vis.selectAll('g.rule')
        .data(y.ticks(15))
      .enter().append('svg:g')
        .attr('class', 'rule')
        .attr('transform', (d) -> "translate(0, #{-y(d)})")
      
      rules.append('svg:line')
        .attr('x2', w - pl - pr)
      
      rules.append('svg:text')
        .attr('x', -25)
        .attr('dy', '0.3em')
        .text((d) -> d)


      
