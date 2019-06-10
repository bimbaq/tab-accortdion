<template>
    <div
        class="kio-widget-container kiot-tabs-accordion"
        :class="[widgetThemeClass, widgetMode]"
        ref="widgetContainer"
        :data-resize="widgetResposiveMode"
        v-images-loaded="imagesLoaded">
        <WidgetLoader v-if="!widgetLoaded"/>
        <resize-observer @notify="resizeWidget"/>
        <div
            class="kio-widget-content"
        >
            <div
                class="kio-widget-body kiot-widget-body"
                :class="[`${themeClasses.prefix}-${mode}`, mode]"
                ref="widgetBody"
                :style="widgetBodyStyles">
                <EmptyLayer
                    :widgetName = "widgetName"
                    :widgetType = "widgetType"
                    :viewMode = "viewMode"
                    :widgetId = "widgetId"
                    :composerRouter = "composerRouter"
                    v-if="tabsAccordionItems.length <= 0"
                />
                <ul
                    class="no-bullet"
                    :class="`${themeClasses.prefix}-${mode}-wrapper kio-${mode}-wrapper`"
                    v-if="tabsAccordionItems.length > 0">
                    <li
                        v-for="(item, index) in tabsAccordionItems"
                        :key="index"
                        :class="`${themeClasses.prefix}-${mode}-header kio-${mode}-header`">
                        <ToggleContent
                            v-if="mode === 'accordion'"
                            :currentItem.sync="currentItem"
                            :itemIndex="index"
                            :item.sync="item"
                            :oneAtTime="oneAtTime"
                            :showFirst="!firstPanelClosed && index === openFirst"
                            :openCloseIcons="openCloseIcons"
                            :callBack="updateOpenArray"
                            :removeActive="tabsAccordionItems.length === openArray.length"/>
                        <button
                            v-html="item.title"
                            v-if="mode === 'tabs'"
                            @click="showTabContent(index)"
                            :class="[{'header-active' : index === currentItem}, themeClasses.paragraph]"/>
                    </li>
                </ul>
                <template v-if="(tabsAccordionItems.length > 0) && (mode ==='tabs')">
                    <template v-for="(contentItem, contentIndex) in tabsAccordionItems">
                        <div
                            :key="contentIndex"
                            class="kio-tabs-content"
                            :class="[themeClasses.tabContent, themeClasses.richContent]"
                            v-html="contentItem.content"
                            v-show="contentIndex === currentItem"/>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import { cloneDeep, lowerCase, filter } from "lodash-es";
    import Base from "../../../shared/knowbly-widget-components/src/Base.js";
    import ToggleContent from "../../../shared/knowbly-widget-components/src/ToggleContent.vue";
    import WidgetLoader from "../../../shared/knowbly-widget-components/src/WidgetLoader.vue";
    import Icon from "../../../shared/knowbly-widget-components/src/Icon.vue";
    import VideoJSMixin from "../../../shared/knowbly-widget-components/src/VideoJSMixin.js";
    import EmptyLayer from "../../../shared/knowbly-widget-components/src/EmptyLayer.vue";

    export default {
        name: "TabsAccordion",
        components: {
            ToggleContent,
            WidgetLoader,
            Icon,
            EmptyLayer
        },
        mixins: [Base, VideoJSMixin],
        props:{
            uid: {
                type: String,
                required: true
            },
            data: {
                type: Object,
                required: true
            },
            settings: {
                type: Array,
                required: true
            },
            widgetMode:{
                type: String,
                required: true
            }
        },
        data() {
            return {
                // basics
                currentItem: 0,
                mode: this.widgetMode,
                tabsAccordionItems: cloneDeep(this.data.items),
                openArray: [],
                openFirst: 0,
                // settings
                oneAtTime: this.widgetMode === "accordion" ? this.getSettingValueByTitle("Open Behavior") === "One at time" : true,
                firstPanelClosed: this.widgetMode === "accordion" ? this.getSettingValueByTitle("First Panel Closed") : false,
                openCloseIcons: {open:"fa-angle-down", close:"fa-angle-up", position: this.widgetMode === "accordion" ? lowerCase(this.getSettingValueByTitle("Icon Alignment")) : "left"}
            };
        },
        watch: {
            widgetResposiveMode() {
                if (this.widgetMode === "tabs") {
                    if (this.isMobile()) {
                        this.openFirst = this.currentItem;
                        this.mode = "accordion";
                    } else {
                        this.mode = this.widgetMode;
                    }
                }
            },
            mode() {
                this.$nextTick(() => {
                    this.startVideoJS();
                });
            },
        },
        methods: {
            showTabContent(itemIndex) {
                this.currentItem = itemIndex;
            },
            updateOpenArray() {
                this.openArray = filter(this.tabsAccordionItems, (item) => item.open);
            }
        },
        created() {
            this.tabsAccordionItems = filter(this.tabsAccordionItems, (item) => this.checkNoEmptyItem(item, ["title", "content"]));

            // SCORM
            this.currentItem = this.firstPanelClosed ? -1 : this.currentItem;
            this.$watch("currentItem", () =>
                        {
                            this.setWidgetProgress({ id: this.currentItem }, this.tabsAccordionItems.length);
                        },
                        {
                            immediate: !this.firstPanelClosed
                        }
            );
        }
    };
</script>
<style lang="scss">
    @import "./scss/TabsAccordion.scss";
</style>
