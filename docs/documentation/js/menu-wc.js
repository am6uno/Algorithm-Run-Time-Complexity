'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">encounter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' : 'data-target="#xs-components-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' :
                                            'id="xs-components-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomepageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomepageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProblemCreationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProblemCreationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProblemSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProblemSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentSolutionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSolutionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' : 'data-target="#xs-injectables-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' :
                                        'id="xs-injectables-links-module-AppModule-7a754e7f4c3509d62e030e2254fb157595f25dc5c1b11c3ca10360633e38a78d60f66b9a2e3ace4e95610c6602fa0c5378366efb6ade9fcde11ffebb71287316"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComplexityParserService.html" data-type="entity-link" >ComplexityParserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProblemService.html" data-type="entity-link" >ProblemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SolutionService.html" data-type="entity-link" >SolutionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Block.html" data-type="entity-link" >Block</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Problem.html" data-type="entity-link" >Problem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Solution.html" data-type="entity-link" >Solution</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Student.html" data-type="entity-link" >Student</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Teacher.html" data-type="entity-link" >Teacher</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});