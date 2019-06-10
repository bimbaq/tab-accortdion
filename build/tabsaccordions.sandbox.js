import TabsAccordions from "../src/TabsAccordions.vue";
import VueCustomElement from "vue-custom-element";
import vueTouchEvents from "vue2-touch-events";
import VueResize from "vue-resize";
import _ from "lodash";

Vue.use(VueCustomElement);
Vue.use(vueTouchEvents, {
    disableClick: false,
    touchClass: 'kio-touch',
    tapTolerance: 10,
    swipeTolerance: 30,
    longTapTimeInterval: 400
});
Vue.use(VueResize);

new Vue({
	el: `tabs-accordions`,
	components: { TabsAccordions },
	data() {
		return {
			widgetData: {
				"items": [
                    {
                        "title": "Nuclear fusion A relatively small, rocky, object, that orbits the sun",
                        "content": "<p>In nuclear physics, nuclear fusion is a reaction in which two or more atomic nuclei come close enough to form one or more different atomic nuclei and subatomic particles (neutrons or protons). The difference in mass between the reactants and products is manifested as the release of large amounts of energy.</p>",
                    },
                    {
                        "title": "Asteroid",
                        "content": "<img src=\"https://devembed.knowblyapp.com/embed/flashcards/5aa15c1454003d003a0186eb/images/desktop/5aa18c3fceb159003e62fe67-488px-NuclearReaction.svg.png\" width=\"50%\" \"> <p>In nuclear physics, nuclear fusion is a reaction in which two or more atomic nuclei come close enough to form one or more different atomic nuclei and subatomic particles (neutrons or protons). The difference in mass between the reactants and products is manifested as the release of large amounts of energy. The difference in mass between the reactants and products is manifested as the release of large amounts of energy. The difference in mass between the reactants and products is manifested as the release of large amounts of energy.</p>",
                    },
                    {
                        "title": "Comet",
                        "content": "<p>A small orbiting body made of dust,ice and frozen gases.</p>",
                    },
                    {
                        "title": "Gravity A small orbiting body made of dust,ice and frozen gases.",
                        "content": "<p>The gravitational attraction between earth and objects at or near its surface.</p>",
                    },
                    {
                        "title": "Asteroid",
                        "content": "<p>A relatively small, rocky, object, that orbits the sun</p>",
                    },
                    {
                        "title": "Comet",
                        "content": "<p>A small orbiting body made of dust,ice and frozen gases.</p>",
                    },
                    {
                        "title": "Gravity",
                        "content": "<p>The gravitational attraction between earth and objects at or near its surface.</p>",
                    },
                    {
                        "title": "Asteroid",
                        "content": "<p>A relatively small, rocky, object, that orbits the sun</p>",
                    },
                    {
                        "title": "Comet",
                        "content": "<p>A small orbiting body made of dust,ice and frozen gases.</p>",
                    },
                    {
                        "title": "Gravity",
                        "content": "<p>The gravitational attraction between earth and objects at or near its surface.</p>",
                    }
                ]
            },
            widgetMode: "tabs", // {tabs, accordion}
            widgetSettings: [
                {
                    "defaultValue": "One at Time",
                    "title": "Open Behavior",
                    "type": "radio",
                    "values": [
                        {
                            "label": "One at Time"
                        },
                        {
                            "label": "Multiple"
                        }
                    ]
                },
                {
                    "defaultValue": false,
                    "label": "First Panel Closed",
                    "type": "checkbox"
                },
                {
                    "defaultValue": "Left",
                    "title": "Icon Alignment",
                    "type": "radio",
                    "values": [
                        {
                            "label": "Left"
                        },
                        {
                            "label": "Right"
                        }
                    ]
                }
            ]
		}
	},
	template: `
		<div>
			<TabsAccordions uid="0x1" :data="widgetData" :settings="widgetSettings" :widgetMode="widgetMode"></TabsAccordions>
		</div>
	`
});
