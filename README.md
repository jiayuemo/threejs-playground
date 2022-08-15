<h2>Overview</h2>
Procedural Map

<h2>Description</h2>
Generate a random miniaturized map with geometric shapes in a blocky cartoon like style on page reload
You can see this live at https://jiayuemo.github.io/threejs-playground/ 

<h2>Credit and Workflow</h2>
This project is an extension of the ThreeJS in practice tutorial by @Domenico_brz.

- [Twitter] (https://twitter.com/Domenico_brz)
- [Github repository] (https://github.com/Domenicobrz/Threejs-in-practice/tree/main/three-in-practice-2)
- [His Personal Website] (https://domenicobrz.github.io/webgl/)
- [Youtube Tutorial Series] (https://www.youtube.com/watch?v=HsCYEA_UuZA)

Workflow toolchain and developer tools have been adapted from a tutorial by @alvarosaburido1.
- [Twitter] (https://twitter.com/alvarosaburido1)
- [His Personal Website] (https://alvarosaburido.dev/)
- [Youtube Tutorial] (https://www.youtube.com/watch?v=TiWRM3J5FlI&ab_channel=AlvaroDevLabs)

Deployment toolchain has been adapted from a tutorial by @_JamesIves.
- [Twitter] (https://twitter.com/_JamesIves)
- [Blog] (https://jamesiv.es/blog/github/actions/2022/01/23/deploying-to-github-pages-with-github-actions)

At the conclusion of the series, the procedural map was generated with threeJS in vanillaJS.

Additional work beyond the tutorial includes:
- addition of scene prop, or doodle, to the procedure map. Try to find the snowmen like statues sitting on top of snow tiles on the map! ⛄
- Usage of Vector3 over Vector2 to better represent tile positions 
- fine tuning of cloud count and cloud height ⛅
- More expressive, commented, consistent function naming to clarify aspects of working with ThreeJS 
- Modularized source code from monolith main file 🔧
- Integration with VITE frontend toolkit for improvements in Developer Experience (absolute imports) 🌟
- Integration with typescript, addition of docblocs to deepen understanding of ThreeJS concepts 
- Integration with typescript-eslint
- Deployment of the project to github pages with github workflows

<h2>Build Tools and Frameworks</h2>
This project was bootstrapped with the VITE [quickstart tool] (https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

This is a vanillaJS project with typescript.

<h2>Packages</h2>

- [three] (https://www.npmjs.com/package/three), as a general purpose 3D library 
- [three-stdlib] (https://www.npmjs.com/package/three-stdlib), threeJS utility functions
- [simplex-noise] (https://www.npmjs.com/package/simplex-noise), noise gradient for procedural goodness

<h2>Local development</h2>
```sh
# Make sure you are on Node v16+
> npm i
> npm run dev
```
