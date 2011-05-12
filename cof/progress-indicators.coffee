$ ->  
  r  = 200
  ri = r / 2 - 20
  ro = r / 2 - 10
  
  prog = d3.range(1, 101)
  angle = d3.scale.ordinal()
    .domain(prog)
    .rangeBands([0, 2 * Math.PI], 0.4)
    
  arc = d3.svg.arc()
    .innerRadius(ri)
    .outerRadius(ro)
    .startAngle((d) -> d.startAngle)
    .endAngle((d) -> d.endAngle)
  
  vis = d3.select('#chart')
    .attr('style', "margin:0 auto; width:#{r}px")
  .append('svg:svg')
    .attr('width', r)
    .attr('height', r)
  .append('svg:g')
    .attr('transform', "translate(#{r / 2}, #{r / 2})")
  
  update = (i) ->
    lbl.text("#{i}%")

  vis.selectAll('path.wedge')
    .data(prog)
  .enter().append('svg:path')
      .attr('class', 'symbol')
      .attr('d', (d, i) -> arc startAngle: angle(d), endAngle: angle(d) + angle.rangeBand())  
      .attr('style', 'opacity:0')
    .transition()
      .delay((d, i) -> i * 100)
      .attr('style', 'opacity:1')
      .each('end', update)
  
  lbl = vis.append('svg:text')
    .attr('class', 'plabel')
    .attr('text-anchor', 'middle')