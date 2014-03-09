require(['d3'], function(d3) {
  var absolute = [
    [
      [
        [15.396, -3.172, 31.31, -6.472, 47.012, -3.714],
        [53.76, -2.53, 66.008, -1.148, 62.744, 8.224],
        [59.022, 16.358, 50.48, 23.532, 63.6, 27.766],
        [71.576, 30.342, 106.46, 32.34, 102.762, 17.432],
        [98.258, 12.526, 92.552, 7.786, 97.836, 1.334],
        [106.898, -3.166, 116.87, -5.214, 126.954, -5.254],
        [138.256, -5.298, 149.322, -3.122, 160.352, -0.8]
      ],
      [
        [8.276, 1.738, 16.54, 3.562, 24.918, 4.608],
        [33.21, 5.644, 41.65, 5.894, 49.918, 4.502],
        [59.966, 2.81, 66.2, 0.232, 59.576, -10.292],
        [55.096, -17.41, 54.884, -19.002, 61.426, -23.908],
        [71.24, -27.508, 82.19, -27.196, 92.196, -24.574],
        [101.954, -22.018, 106.272, -17.948, 98.638, -8.938],
        [90.694, 0.44, 98.748, 2.944, 108.078, 4.712],
        [125.332, 7.982, 142.75, 4.278, 160, 0]
      ]
    ],
    [
      [
        [3.202, 9.08, 6.278, 18.018, 6.308, 26.202],
        [6.332, 32.692, 4.41, 38.92, 0.76, 44.286],
        [-8.348, 44.372, -16.472, 38.814, -24.754, 38.958],
        [-41.234, 39.244, -39.452, 63.22, -28.994, 70.364],
        [-23.984, 73.788, -17.888, 73.292, -13.076, 69.752],
        [-4.48, 63.432, 1.43, 68.162, 4.862, 76.988],
        [10.254, 90.842, 4.99, 105.438, 0.47, 118.716],
        [0.416, 118.878, 0.36, 119.044, 0, 120]
      ],
      [
        [-1.714, 4.938, -3.376, 9.892, -4.496, 14.99],
        [-7.014, 26.462, -6.174, 48.848, 11.024, 44.982],
        [18.222, 43.364, 24.846, 38.256, 32.562, 40.09],
        [38.546, 44.68, 40.376, 51.768, 39.342, 58.99],
        [38.286, 66.37, 35.344, 74.952, 26.244, 73.952],
        [20.212, 73.29, 15.468, 68.842, 9.558, 67.75],
        [-4.066, 65.234, -7.978, 87.92, -6.898, 97.506],
        [-6.472, 101.286, -3.356, 110.422, -0.368, 120.8]
      ]
    ],
    [
      [
        [-16.93, 3.486, -34.348, 7.19, -51.602, 3.92],
        [-60.932, 2.152, -68.986, -0.352, -61.042, -9.73],
        [-53.408, -18.74, -57.726, -22.81, -67.484, -25.366],
        [-77.49, -27.988, -88.44, -28.3, -98.254, -24.7],
        [-104.796, -19.794, -104.584, -18.202, -100.104, -11.084],
        [-93.48, -0.56, -99.714, 2.018, -109.762, 3.71],
        [-118.03, 5.102, -126.47, 4.852, -134.762, 3.816],
        [-143.14, 2.77, -151.404, 0.946, -159.68, -0.792]
      ],
      [
        [-11.03, -2.322, -22.096, -4.498, -33.398, -4.454],
        [-43.482, -4.414, -53.454, -2.366, -62.516, 2.134],
        [-67.8, 8.586, -62.094, 13.326, -57.59, 18.232],
        [-53.892, 33.14, -88.776, 31.142, -96.752, 28.566],
        [-109.872, 24.332, -101.33, 17.158, -97.608, 9.024],
        [-94.344, -0.348, -106.592, -1.73, -113.34, -2.914],
        [-129.042, -5.672, -144.956, -2.372, -160, 0]
      ]
    ],
    [
      [
        [-2.988, -10.378, -6.104, -19.514, -6.53, -23.294],
        [-7.61, -32.88, -3.698, -55.566, 9.926, -53.05],
        [15.836, -51.958, 20.58, -47.51, 26.612, -46.848],
        [35.712, -45.848, 38.654, -54.43, 39.71, -61.81],
        [40.744, -69.032, 38.914, -76.12, 32.93, -80.71],
        [25.214, -82.544, 18.59, -77.436, 11.392, -75.818],
        [-5.806, -71.952, -6.646, -94.338, -4.128, -105.81],
        [-3.008, -110.908, -1.346, -115.862, 0, -120]
      ],
      [
        [0.056, -0.164, 0.112, -0.33, 0.166, -0.492],
        [4.686, -13.77, 9.95, -28.366, 4.558, -42.22],
        [1.126, -51.046, -4.784, -55.776, -13.38, -49.456],
        [-18.192, -45.916, -24.288, -45.42, -29.298, -48.844],
        [-39.756, -55.988, -41.538, -79.964, -25.058, -80.25],
        [-16.776, -80.394, -8.652, -74.836, 0.456, -74.922],
        [4.106, -80.288, 6.028, -86.516, 6.004, -93.006],
        [5.974, -101.19, 2.898, -110.128, -0.304, -119.208]
      ]
    ]
  ];
  var relative = [
    [
      [
        [15.396, -3.172, 31.31, -6.472, 47.012, -3.714],
        [6.748, 1.184, 18.996, 2.566, 15.732, 11.938],
        [-3.722, 8.134, -12.264, 15.308, 0.856, 19.542],
        [7.976, 2.576, 42.86, 4.574, 39.162, -10.334],
        [-4.504, -4.906, -10.21, -9.646, -4.926, -16.098],
        [9.062, -4.5, 19.034, -6.548, 29.118, -6.588],
        [11.302, -0.044, 22.368, 2.132, 33.398, 4.454]
      ],
      [
        [8.276, 1.738, 16.54, 3.562, 24.918, 4.608],
        [8.292, 1.036, 16.732, 1.286, 25, -0.106],
        [10.048, -1.692, 16.282, -4.27, 9.658, -14.794],
        [-4.48, -7.118, -4.692, -8.71, 1.85, -13.616],
        [9.814, -3.6, 20.764, -3.288, 30.77, -0.666],
        [9.758, 2.556, 14.076, 6.626, 6.442, 15.636],
        [-7.944, 9.378, 0.11, 11.882, 9.44, 13.65],
        [17.254, 3.27, 34.672, -0.434, 51.922, -4.712]
      ]
    ],
    [
      [
        [3.202, 9.08, 6.278, 18.018, 6.308, 26.202],
        [0.024, 6.49, -1.898, 12.718, -5.548, 18.084],
        [-9.108, 0.086, -17.232, -5.472, -25.514, -5.328],
        [-16.48, 0.286, -14.698, 24.262, -4.24, 31.406],
        [5.01, 3.424, 11.106, 2.928, 15.918, -0.612],
        [8.596, -6.32, 14.506, -1.59, 17.938, 7.236],
        [5.392, 13.854, 0.128, 28.45, -4.392, 41.728],
        [-0.054, 0.162, -0.11, 0.328, -0.47, 1.284]
      ],
      [
        [-1.714, 4.938, -3.376, 9.892, -4.496, 14.99],
        [-2.518, 11.472, -1.678, 33.858, 15.52, 29.992],
        [7.198, -1.618, 13.822, -6.726, 21.538, -4.892],
        [5.984, 4.59, 7.814, 11.678, 6.78, 18.9],
        [-1.056, 7.38, -3.998, 15.962, -13.098, 14.962],
        [-6.032, -0.662, -10.776, -5.11, -16.686, -6.202],
        [-13.624, -2.516, -17.536, 20.17, -16.456, 29.756],
        [0.426, 3.78, 3.542, 12.916, 6.53, 23.294]
      ]
    ],
    [
      [
        [-16.93, 3.486, -34.348, 7.19, -51.602, 3.92],
        [-9.33, -1.768, -17.384, -4.272, -9.44, -13.65],
        [7.634, -9.01, 3.316, -13.08, -6.442, -15.636],
        [-10.006, -2.622, -20.956, -2.934, -30.77, 0.666],
        [-6.542, 4.906, -6.33, 6.498, -1.85, 13.616],
        [6.624, 10.524, 0.39, 13.102, -9.658, 14.794],
        [-8.268, 1.392, -16.708, 1.142, -25, 0.106],
        [-8.378, -1.046, -16.642, -2.87, -24.918, -4.608]
      ],
      [
        [-11.03, -2.322, -22.096, -4.498, -33.398, -4.454],
        [-10.084, 0.04, -20.056, 2.088, -29.118, 6.588],
        [-5.284, 6.452, 0.422, 11.192, 4.926, 16.098],
        [3.698, 14.908, -31.186, 12.91, -39.162, 10.334],
        [-13.12, -4.234, -4.578, -11.408, -0.856, -19.542],
        [3.264, -9.372, -8.984, -10.754, -15.732, -11.938],
        [-15.702, -2.758, -31.616, 0.542, -46.66, 2.914]
      ]
    ],
    [
      [
        [-2.988, -10.378, -6.104, -19.514, -6.53, -23.294],
        [-1.08, -9.586, 2.832, -32.272, 16.456, -29.756],
        [5.91, 1.092, 10.654, 5.54, 16.686, 6.202],
        [9.1, 1, 12.042, -7.582, 13.098, -14.962],
        [1.034, -7.222, -0.796, -14.31, -6.78, -18.9],
        [-7.716, -1.834, -14.34, 3.274, -21.538, 4.892],
        [-17.198, 3.866, -18.038, -18.52, -15.52, -29.992],
        [1.12, -5.098, 2.782, -10.052, 4.128, -14.19]
      ],
      [
        [0.056, -0.164, 0.112, -0.33, 0.166, -0.492],
        [4.52, -13.278, 9.784, -27.874, 4.392, -41.728],
        [-3.432, -8.826, -9.342, -13.556, -17.938, -7.236],
        [-4.812, 3.54, -10.908, 4.036, -15.918, 0.612],
        [-10.458, -7.144, -12.24, -31.12, 4.24, -31.406],
        [8.282, -0.144, 16.406, 5.414, 25.514, 5.328],
        [3.65, -5.366, 5.572, -11.594, 5.548, -18.084],
        [-0.03, -8.184, -3.106, -17.122, -6.308, -26.202]
      ]
    ]
  ];

  var uw = 160
    , uh = 120
    , x = 8
    , y = 3
    , ix = 6
    , iy = 4
    , width = 256
    , height = 192
    , pieces = []
    , t, r, b, l
    , shuffle = d3.range(0, ix * iy);
  console.log(shuffle);
  shuffle = d3.shuffle(shuffle);
  console.log(shuffle);

  var container = d3.select('#canvas-container');

  var canvas = container.append('canvas')
    .attr('width', width * x)
    .attr('height', height * y);

  var context = canvas.node().getContext('2d');

  var svg = container.append("svg")
    .attr('width', width * x)
    .attr('height', height * y);

  var mesh = svg.append('g')
    .attr('class', 'canvas-mesh')
    .selectAll('path');

  var anchor = svg.append('g')
    .attr('class', 'canvas-anchor')
    .selectAll('a');

  for (var i = 0; i < y; i += 1) {
    pieces[i] = [];
    for (var j = 0; j < x; j += 1) {
      if (i !== 0) {
        t = 1 - pieces[i - 1][j][2];
      } else {
        t = Math.round(Math.random());
      }
      r = Math.round(Math.random());
      b = Math.round(Math.random());
      if (j !== 0) {
        l = 1 - pieces[i][j - 1][1];
      } else {
        l = Math.round(Math.random());
      }
      pieces[i][j] = [t, r, b, l];
    }
  }

  var img = new Image();
  img.onload = ready;
  img.src = 'http://c.weihub.com/images/canvas.png';

  function ready() {
    var data = [];
    pieces.forEach(function(row, j) {
      row.forEach(function(piece, i) {
        context.save();
        context.translate(i * uw, j * uh);
        context.beginPath();
        context.moveTo(0, 0);
        context.save();
        piece.forEach(function(side, k) {
          var map = absolute[k][side];
          map.forEach(function(p) {
            context.bezierCurveTo.apply(context, p);
          });
          context.translate(map[map.length - 1][4], map[map.length - 1][5]);
        });
        context.restore();
        context.closePath();
        // context.stroke();
        context.clip();
        var n = j * x + i
          , m = shuffle[n];
        context.drawImage(img, (m % ix) * width, Math.floor(m / ix) * height, width, height, (uw - width) / 2, (uh - height) / 2, width, height);
        context.restore();
        data[n] = piece;
      });
    });

    [mesh, anchor].forEach(function(item){
      item = item.data(data);
      item.exit().remove();
      var enter = item.enter();
      if (item === anchor) {
        anchor = item;
        enter = enter.append('a');
          // .attr('xlink:href', '#');
      } else {
        mesh = item;
      }
      enter.append('path')
        .attr('d', function(piece, k) {
          var i = k % x,
            j = Math.floor(k / x),
            d = ['M0,0'];
          piece.forEach(function(side, k) {
            var map = relative[k][side];
            map.forEach(function(p) {
              d.push('c' + p.join(','));
            });
          });
          d.push('z');
          return d.join('');
        });
      item.attr('transform', function(piece, k) {
        var i = k % x,
          j = Math.floor(k / x);
        return 'translate(' + (i * uw) + ',' + (j * uh) + ')';
      });
    });
  }

});