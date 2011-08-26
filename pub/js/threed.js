(function() {
  $(function() {
    var angle, aspect, camera, cont, far, h, mat, near, pl, r, renderer, rings, scene, segs, sphere, t, tsphere, w;
    w = 500;
    h = 500;
    cont = $('#chart').css({
      width: w,
      height: h,
      margin: '0 auto'
    });
    t = THREE;
    angle = 45;
    aspect = w / h;
    near = 0.1;
    far = 10000;
    renderer = new t.WebGLRenderer();
    camera = new t.Camera(angle, aspect, near, far);
    scene = new t.Scene();
    camera.position.z = 300;
    renderer.setSize(w, h);
    cont.append(renderer.domElement);
    r = 50;
    segs = 26;
    rings = 26;
    mat = new t.MeshLambertMaterial({
      color: 0xCC0000
    });
    tsphere = new t.SphereGeometry(r, segs, rings);
    sphere = new t.Mesh(tsphere, mat);
    scene.addChild(sphere);
    pl = new t.PointLight(0xFFFFFF);
    pl.position.x = 10;
    pl.position.y = 10;
    pl.position.z = 190;
    scene.addLight(pl);
    return renderer.render(scene, camera);
  });
}).call(this);
