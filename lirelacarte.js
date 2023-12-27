onload = (event) => {
    lire = {
        regionsByInsee: {},
        regionsByName: {},
        departementsByName: {},
        departementsByNumber: {},
        carte: false,
        regionsElements: false,
        mousePos: { x: 0, y: 0 },
        counts: {
            regionsByInsee: 0,
            regionsByName: 0,
            departementsByName: 0,
            departementsByNumber: 0,
        },
        lire: function () {
            this.style()
            this.mouse()
            this.vignettes('vignette')
            this.carte = document.getElementsByClassName('carte')
            this.regionsElements = this.carte[0].children[0].children
            if (this.regionsElements) {
                for (const key in this.regionsElements) {
                    if (Object.hasOwnProperty.call(this.regionsElements, key)) {
                        const regionElement = this.regionsElements[key]
                        if (regionElement) {
                            const regionInsee = regionElement.getAttribute('data-code_insee')
                            const regionName = regionElement.getAttribute('data-nom')
                            if (regionElement && regionInsee && regionName) {
                                const obj = {
                                    name: regionName,
                                    insee: regionInsee
                                }
                                this.regionsByName[regionName] = this.regionsByInsee[regionInsee] = obj
                                this.counts.regionsByName++
                                this.counts.regionsByInsee++
                                // add listener
                                // regionElement.addEventListener('mouseenter', (element) => {
                                //     this.hoverRegion(obj)
                                // })
                                const departementElements = regionElement.children
                                if (departementElements) {
                                    for (const key2 in departementElements) {
                                        if (Object.hasOwnProperty.call(departementElements, key2)) {
                                            const departementElement = departementElements[key2];
                                            if (departementElement) {
                                                const departementNumber = departementElement.getAttribute('data-numerodepartement')
                                                const departementName = departementElement.getAttribute('data-nom')
                                                if (departementNumber && departementName) {
                                                    const obj2 = {
                                                        name: regionName,
                                                        insee: regionInsee,
                                                        departementNumber: departementNumber,
                                                        departementName: departementName
                                                    }
                                                    this.departementsByName[departementName] = this.departementsByNumber[departementNumber] = obj2
                                                    this.counts.departementsByName++
                                                    this.counts.departementsByNumber++
                                                    departementElement.addEventListener('mouseenter', (regionElement) => {
                                                        this.hoverDepartement(obj2,regionElement)
                                                    })
                                                    departementElement.addEventListener('mouseout', (regionElement) => {
                                                        this.exitDepartement(obj2,regionElement)
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        mouse: function (e) {
            onmousemove = (e) => {
                this.mousePos = { x: e.clientX, y: e.clientY }
                const vignetteCalc = this.vignette.getBoundingClientRect()

                const left = vignetteCalc.width * (e.clientX < (window.innerWidth / 2) ? 1 : -1);
                const top = vignetteCalc.height * (e.clientY < (window.innerHeight / 2) ? 1 : -1);

                this.vignette.style.top = (this.mousePos.y - (vignetteCalc.height / 2) + top) + 'px'
                this.vignette.style.left = (this.mousePos.x - (vignetteCalc.width / 2)+ left) + 'px'
            }
        },
        vignettes: function (name) {
            this[name] = document.createElement('div')
            this[name].className = name
            this[name].textContent = 'vignette'
            this[name].style.position = 'absolute'
            document.body.appendChild(this[name])
        },
        exitDepartement: function (dep,reg) {
            reg.target.style.transform = 'translate(0,0)'
        },
        hoverDepartement: function (dep,reg) {
            // reg.target.style.transform = 'translate(-.2%,-.2%)'
            this['vignette'].textContent = `${dep.departementName} (${dep.departementNumber}) en ${dep.name} [${dep.insee}], `
        },
        // hoverRegion: function (e) {
        //     // console.log(e)
        // },
        style: function (e) {
            this.addCss(
                '.vignette{background-color:white;border-radius:.5rem;padding:.5rem;transition-property:top,left;transition-duration:.2s;}',
                'cartedefrance'
            )
        },
        addCss(stringcss, styleid) {
            let style = document.createElement("style");
            style.textContent = stringcss;
            style.id = "css_" + styleid;
            document.getElementsByTagName("head")[0].appendChild(style);
        },
    }.lire()
}
