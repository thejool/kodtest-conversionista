const qs = document.querySelector.bind(document);
const easingHeart = mojs.easing.path('M80.872,3.471l-60.903,98.662c-2.122,3.436-1.055,7.938,2.38,10.057c1.196,0.738,2.521,1.092,3.832,1.092,c2.451,0,4.846-1.231,6.227-3.472l60.903-98.663c2.121-3.435,1.055-7.937-2.381-10.056C87.496-1.029,82.99,0.036,80.872,3.471z');

const el = {
  container: qs('.mo-container'),

  j: qs('.lttr--J'),
  o: qs('.lttr--O'),
  e: qs('.lttr--E'),
  l: qs('.lttr--L'),
  g: qs('.lttr--G'),
  u: qs('.lttr--U'),
  s: qs('.lttr--S'),
  s2: qs('.lttr--S2'),
  s3: qs('.lttr--S3'),
  t: qs('.lttr--T'),
  a: qs('.lttr--A'),
  f: qs('.lttr--F'),
  n: qs('.lttr--N'),
  o2: qs('.lttr--O2'),

  lineLeft: qs('.line--left'),
  lineRight: qs('.line--rght'),

  colTxt: "#763c8c",
  colHeart: "#fa4843",
};

class Heart extends mojs.CustomShape {
  getShape() {
    return '<path d="M80.872,3.471l-60.903,98.662c-2.122,3.436-1.055,7.938,2.38,10.057c1.196,0.738,2.521,1.092,3.832,1.092,c2.451,0,4.846-1.231,6.227-3.472l60.903-98.663c2.121-3.435,1.055-7.937-2.381-10.056C87.496-1.029,82.99,0.036,80.872,3.471z"/>';
  }
  getLength () { return 200; }
}
mojs.addShape('heart', Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
  parent = el.container;
  const crcl = new mojs.Shape({
    shape:        'circle',
    fill:         'none',
    stroke:        el.colTxt,
    strokeWidth:  { 5 : 0 },
    radius:       { [rd] : [rd + 20] },
    easing:       'quint.out',
    duration:     500 / 3,
    parent,
    delay,
    x
  });

  const brst = new mojs.Burst({
    radius:       { [rd + 15] : 110 },
    angle:        'rand(60, 180)',
    count:        3,
    timeline:     { delay },
    parent,
    x,
    children: {
      radius:       [5, 3, 7],
      fill:         el.colTxt,
      scale:        { 1: 0, easing: 'quad.in' },
      pathScale:    [ .8, null ],
      degreeShift:  [ 'rand(13, 60)', null ],
      duration:     1000 / 3,
      easing:       'quint.out'
    }
  });

  return [crcl, brst];
};

const crtLoveTl = () => {
  const move        = 1000;
  const boom        = 200;
  const easing      = 'sin.inOut';
  const easingBoom  = 'sin.in';
  const easingOut   = 'sin.out';
  const opts        = { duration: move, easing, opacity: 1 };
  const delta       = 150;

  return (new mojs.Timeline).add([
    new mojs.Tween({
      duration: move,
      onStart: () => {
        [el.j, el.o, el.e, el.l, el.g, el.u, el.s, el.s2, el.s3, el.t, el.a, el.f, el.o2, el.n].forEach(el => {
          el.style.opacity = 1;
          el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;'
        })
      },
      onComplete: () => {
        [el.u, el.s, el.s2, el.s3, el.t, el.a, el.f, el.o2, el.n].forEach(el => el.style.opacity = 0);
        // el.blop.play();
      }
    }),

    new mojs.Tween({
      duration: move * 2 + boom,
      onComplete: () => {
        [el.o, el.e, el.l].forEach(el => el.style.opacity = 0);
      }
    }),

    new mojs.Tween({
      duration: move * 3 + boom * 2 - delta,
      onComplete: () => {
        el.j.style.opacity = 0;
      }
    }),

    new mojs.Tween({
      duration: move * 3 + boom * 2,
      onComplete: () => {
        el.g.style.opacity = 0;
      }
    }),

    new mojs.Tween({
      duration: 50,
      delay: 4050,
      onUpdate: (progress) => {
        [el.j, el.o, el.e, el.l, el.g, el.u, el.s, el.s2, el.s3, el.t, el.a, el.f, el.o2, el.n].forEach(el => {
          el.style = `transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: ${1 * progress};`
        })
      },
      onComplete: () => {
        [el.j, el.o, el.e, el.l, el.g, el.u, el.s, el.s2, el.s3, el.t, el.a, el.f, el.o2, el.n].forEach(el => {
          el.style.opacity = 1;
          el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;'
        })
      }
    }),

    new mojs.Html({
      ...opts,
      el: el.lineLeft,
      x: { 0 : 52 },
    }).then({
      duration: boom + move,
      easing,
      x: { to : 52 + 54 }
    }).then({
      duration: boom + move,
      easing,
      x: { to : 52 + 54 + 60 }
    }).then({
      duration: 150, // 3550
      easing,
      x: { to : 52 + 54 + 60 + 10 }
    }).then({
      duration: 300
    }).then({
      duration: 350,
      x: { to : 0 },
      easing: easingOut
    }),

    new mojs.Html({
      ...opts,
      el: el.lineRight,
      x: { 0 : -52 },
    }).then({
      duration: boom + move,
      easing,
      x: { to : -52 - 54 }
    }).then({
      duration: boom + move,
      easing,
      x: { to : -52 - 54 - 60 }
    }).then({
      duration: 150,
      easing,
      x: { to : -52 - 54 - 60 - 10 }
    }).then({
      duration: 300
    }).then({
      duration: 350,
      x: { to : 0 },
      easing: easingOut,
    }),

    new mojs.Html({ // [I] LOVE YOU
      ...opts,
      el: el.j,
      x: { 0 : 34 },
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : 34 + 19 }
    }).then({
      duration: move,
      easing,
      x: { to : 34 + 19 + 40 }
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : 34 + 19 + 40 + 30 }
    }).then({
      duration: move,
      easing,
      x: { to : 34 + 19 + 40 + 30 + 30 }
    }),
    //
    // new mojs.Html({ // I [L]OVE YOU
    //   ...opts,
    //   el: el.l,
    //   x: { 0 : 15 },
    // }),
    //
    // new mojs.Html({ // I L[O]VE YOU
    //   ...opts,
    //   el: el.o,
    //   x: { 0 : 11 },
    // }),
    //
    // new mojs.Html({ // I LO[V]E YOU
    //   ...opts,
    //   el: el.v,
    //   x: { 0 : 3 },
    // }),
    //
    // new mojs.Html({ // I LOV[E] YOU
    //   ...opts,
    //   el: el.e,
    //   x: { 0 : -3 },
    // }),
    //
    // new mojs.Html({ // I LOVE [Y]OU
    //   ...opts,
    //   el: el.y,
    //   x: { 0 : -20 },
    // }).then({
    //   duration: boom,
    //   easing: easingBoom,
    //   x: { to : -20 - 33}
    // }).then({
    //   duration: move,
    //   easing,
    //   x: { to : -20 - 33 - 24 }
    // }),
    //
    // new mojs.Html({ // I LOVE Y[O]U
    //   ...opts,
    //   el: el.o2,
    //   x: { 0 : -27 },
    // }).then({
    //   duration: boom,
    //   easing: easingBoom,
    //   x: { to : -27 - 27}
    // }).then({
    //   duration: move,
    //   easing,
    //   x: { to : -27 - 27 - 30 }
    // }),
    //
    // new mojs.Html({ // I LOVE YO[U]
    //   ...opts,
    //   el: el.u,
    //   x: { 0 : -32 },
    // }).then({
    //   duration: boom,
    //   easing: easingBoom,
    //   x: { to : -32 - 21}
    // }).then({
    //   duration: move,
    //   easing,
    //   x: { to : -32 - 21 - 36 }
    // }).then({
    //   duration: boom,
    //   easing: easingBoom,
    //   x: { to : -32 - 21 - 36 - 31 }
    // }).then({
    //   duration: move,
    //   easing,
    //   x: { to : -32 - 21 - 36 - 31 - 27 }
    // }),

    new mojs.Shape({
      parent: el.container,
      shape: 'heart',
      delay: move,
      fill: el.colHeart,
      x: -64,
      scale: { 0 : 0.95, easing: easingHeart },
      duration: 500
    }).then({
      x: { to : -62, easing },
      scale: { to : 0.65, easing },
      duration: boom + move - 500,
    }).then({
      duration: boom - 50,
      x: { to: -62 + 48 },
      scale: { to : 0.90 },
      easing: easingBoom
    }).then({
      duration:  125,
      scale: { to : 0.8 },
      easing: easingOut
    }).then({
      duration:  125,
      scale: { to : 0.85 },
      easing: easingOut
    }).then({
      duration: move - 200,
      scale: { to : 0.45 },
      easing
    }).then({
      delay: -75,
      duration: 150,
      x: { to: 0 },
      scale: { to : 0.90 },
      easing: easingBoom
    }).then({
      duration:  125,
      scale: { to : 0.8 },
      easing: easingOut
    }).then({
      duration:  125, // 3725
      scale: { to : 0.85 },
      easing: easingOut
    }).then({
      duration: 125, // 3850
    }).then({
      duration: 350,
      scale: { to : 0 },
      easing: easingOut
    }),

    ...crtBoom(move, -64, 46),
    ...crtBoom(move * 2 + boom, 18, 34),
    ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
    ...crtBoom(move * 3 + boom * 2, 45, 34)
  ]);
};

const loveTl = crtLoveTl().play();
setInterval(() => { loveTl.replay() }, 4300);
