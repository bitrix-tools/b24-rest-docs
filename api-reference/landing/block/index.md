# Сущность Блоки

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Блок это html-код, который сопровожден [файлом манифеста](./manifest.md). Вот пример такого простейшего блока:

```html
<section class="landing-block">
    <div class="text-center g-color-gray-dark-v3 g-pa-10">
        <div class="g-width-600 mx-auto">
            <div class="landing-block-node-text g-font-size-12 ">
                <p>&copy; 2017 All right reserved. Developed by
                <a href="#" class="landing-block-node-link g-color-primary">Bitrix24</a></p>
            </div>
        </div>
    </div>
</section>
```

Стоит помнить, что в момент вывода блоков (как в режиме редактирования, так и в режиме просмотра) он обрамляется в спец.обертку `<div id="anchor" class="block-wrapper block-code">...</div>`, где:

- **anchor** – якорь блока, если не изменен пользователем, то вида block123, где 123 id блока;
- **block-wrapper** – одинаковый класс для всех блоков;
- **block-code** – класс, зависящий от кода блока, где **code** является непосредственно кодом блока (приведенный к безопасному виду).

{% note warning %}

В режиме редактирования создаются копии всех блоков до их публикации. И обращение по ID к блокам надо делать ссылаясь на блоки именно чернового варианта.

{% endnote %}

Верстку новых блоков вы можете заказать у специалиста, или воспользоваться предложенными дополнительными блоками [вендора](https://htmlstream.com/preview/unify-v2.6/unify-main/shortcodes/index.html).