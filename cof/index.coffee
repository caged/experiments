$ ->
  # w = 800
  # h = 800
  # rc = 5 # row count
  # cc = 5 # col count
  # y = d3.scale.linear().domain([0, rc]).range [h, 0]
  # x = d3.scale.linear().domain([0, cc]).range [0, w]
  # 
  # grid = d3.select('#grid')
  #   .append('svg:svg')
  #     .attr('width', w)
  #     .attr('height', h)
  # 
  # rows = grid.selectAll('g.row')
  #   .data(y.ticks(rc))
  # .enter().append('svg:g')
  # 
  # rows.append('svg:line')
  #   .attr('x1', (d) -> x(d))
  #   .attr('x2', (d) -> x(d))
  #   .attr('y1', (d) -> 0)
  #   .attr('y2', (d) -> 0)
  #   .attr('class', (d, i) ->  if i == 0 then 'hide' else 'rule')
  # .transition()
  #   .delay((d, i) -> i * 150)
  #   .attr('y2', (d) -> h)
  #     
  # cols = grid.selectAll('g.row')
  #   .data(y.ticks(cc))
  # .enter().append('svg:g')
  # 
  # cols.append('svg:line')
  #   .attr('x1', (d) -> 0)
  #   .attr('x2', (d) -> 0)
  #   .attr('y1', (d) -> y(d))
  #   .attr('y2', (d) -> y(d))
  #   .attr('class', (d, i) ->  if i == 0 then 'hide' else 'rule')
  # .transition()
  #   .delay((d, i) -> i * 150)
  #   .attr('x2', (d) -> w)
