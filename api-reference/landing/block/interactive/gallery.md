# Галереи

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Галерея создаётся с использованием стандартных нод-картинок и карточки. В [манифесте блока](../manifest.md) укажите расширение **landing_gallery_cards**.

```js
'assets' => array(
    'ext' => array('landing_gallery_cards'),
),
```

В разметке обозначьте контейнер классом **.js-gallery-cards**, внутри него добавьте необходимое количество нод **<img>**. Каждому изображению добавьте атрибут **data-fancybox="gallery"**. Этот служебный параметр может иметь любое значение, кроме пустого.

Галерея имеет только одну версию изображения, а не миниатюру и полную, как обычно. Поэтому используйте картинки достаточного размера или масштабируйте их средствами браузера (ограничивать ширину/высоту). Скрипт галереи обернёт каждую картинку в ссылку и по клику будет открывать изображение, указанное в **src**.

Опционально допускается атрибут **data-link-classes="d-block g-pos-rel"**.

Оба класса добавляются к ссылке-обёртке вокруг изображения, они необходимы для вёрстки.

Галереи могут совмещаться с другими возможностями. Например, картинки могут быть карточками, чтобы клиент добавлял столько, сколько нужно. Или же это может быть слайдер, каждая из картинок которого может открываться в большом размере. Примеры можно увидеть в наших стандартных блоках.

{% note warning %}

При совмещении галереи и карусели (слайдера) нужно инициализировать ассеты в определённом порядке: сначала карусель, затем - галерею! Другие ассеты, при их наличии, могут идти в любой последовательности. Смотри код ниже.

{% endnote %}

```js
'assets' => [
    'ext' => ['landing_carousel', 'landing_gallery_cards'],
],
```

## Пример

```html
<div class="landing-block g-pt-80 g-pb-80">
    <div class="container">
        <div class="js-gallery-cards row">
            <div class="landing-block-node-card js-animation slideInUp text-center col-lg-3 col-md-4 col-sm-6 g-mb-30">
                <div class="g-pos-rel d-inline-block">
                    <img class="landing-block-node-card-img h-100 g-width-auto g-max-width-100x g-max-height-350 g-max-height-500--md"
                        src="https://cdn.bitrix24.site/bitrix/images/landing/business/270x481/img1.jpg"
                        data-fancybox="gallery"
                        data-link-classes="d-block g-pos-rel" alt=""/>
                </div>
            </div>

            <div class="landing-block-node-card js-animation slideInUp text-center col-lg-3 col-md-4 col-sm-6 g-mb-30">
                <div class="g-pos-rel d-inline-block">
                    <img class="landing-block-node-card-img h-100 g-width-auto g-max-width-100x g-max-height-350 g-max-height-500--md"
                        src="https://cdn.bitrix24.site/bitrix/images/landing/business/270x481/img2.jpg"
                        data-fancybox="gallery"
                        data-link-classes="d-block g-pos-rel" alt=""/>
                </div>
            </div>

            <div class="landing-block-node-card js-animation slideInUp text-center col-lg-3 col-md-4 col-sm-6 g-mb-30">
                <div class="g-pos-rel d-inline-block">
                    <img class="landing-block-node-card-img h-100 g-width-auto g-max-width-100x g-max-height-350 g-max-height-500--md"
                        src="https://cdn.bitrix24.site/bitrix/images/landing/business/270x481/img3.jpg"
                        data-fancybox="gallery"
                        data-link-classes="d-block g-pos-rel" alt=""/>
                </div>
            </div>

            <div class="landing-block-node-card js-animation slideInUp text-center col-lg-3 col-md-4 col-sm-6 g-mb-30">
                <div class="g-pos-rel d-inline-block">
                    <img class="landing-block-node-card-img h-100 g-width-auto g-max-width-100x g-max-height-350 g-max-height-500--md"
                        src="https://cdn.bitrix24.site/bitrix/images/landing/business/270x481/img4.jpg"
                        data-fancybox="gallery"
                        data-link-classes="d-block g-pos-rel" alt=""/>
                </div>
            </div>

        </div>
    </div>
</div>
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}