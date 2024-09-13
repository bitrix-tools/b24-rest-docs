# Счетчики обратного отсчета

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Пример счётчика:

![timer](./_images/timer.png)

В [манифесте блока](../manifest.md) добавьте расширение `landing_countdown`.

```php
'assets' => array(
    'ext' => array('landing_countdown'),
),
```

В разделе **block** манифеста добавьте ключ:

```php
'version' => '18.5.0'
```

Параметр version необязателен, но он ограничит добавления данного блока в версии ранее указанной, когда ещё не существовало нужных asset'ов.

Добавьте атрибуты для ноды-контейнера счётчика к той ноде, которая соответствует описанию и должна выполнять роль счетчика. За подробностями смотри пример.

```php
'attrs' => array(
    '.landing-block-node-date' => array(
        'name' => Loc::getMessage('LANDING_BLOCK_51_2_COUNTDOWN_04--DATE'),
        'time' => true,
        'type' => 'date',
        'format' => 'ms',
        'attribute' => 'data-end-date',
    ),
),
```

## Разметка

Таймер должен содержать 4 цифровых элемента, помеченных соответствующими классами:

- **js-cd-days** - дни
- **js-cd-hours** - часы
- **js-cd-minutes** - минуты
- **js-cd-seconds** - секунды

Возможность добавлять год отсутствует, мы считаем нецелесообразным создавать столь долгие таймеры на сайте.

Цифры оборачивайте в общий контейнер, помеченный классом **js-countdown**. Этому же контейнеру передавайте настройки посредством дата-атрибутов.

- **data-end-date="1586690955000"** - дата окончания таймера в формате Unix-time в миллисекундах. Т.е. полученную unix-дату нужно умножить на 1000.
- **data-days-format="%D"** - формат представления дней
- **data-hours-format="%H"** - формат представления часов
- **data-minutes-format="%M"** - формат представления минут
- **data-seconds-format="%S"** - формат представления секунд

Доступно два вариант формата:
- **"%S"** - выводит число с лидирующими нулями "03", но "18",
- **"%-S"** - выводит только значимые символы "3" или "18".

Вместо **"%H"** можно использовать **"%I"** или **"%-I"**. Это значение полного количества часов до окончания (то есть, 1 день 6 часов превращается в 30 часов). В этом случае нужно удалить data-days-format и ноду .js-cd-days.

Необязательный параметр:

```html
data-days-expired-classes="u-countdown--days-expiried"
```

Когда количество дней станет равным нулю, таймер может добавить себе помечающий класс. Это поможет вам скрыть нулевое количество дней, либо как-то выделить их. Мы используем для этого класс **.u-countdown--days-hide**.

## Пример

Примеры блоков данного типа вы можете посмотреть в нашем репозитории, воспользовавшись методами [landing.block.getmanifestfile](.) и [landing.block.getrepository](.). Их коды:

- 51.2.countdown_04
- 51.3.countdown_08
- 51.3.countdown_08_wo_bg
- 51.4.countdown_music
- 51.5.countdown_event
- 51.7.countdown_13
- 51.1.countdown_01

Пример простого таймера

```html
<section class="landing_block g-pt-30 g-pb-30 g-bg-orange g-color-white">
    <div class="landing-block-node-date mx-auto js-countdown text-center g-font-weight-300 g-line-height-1-2"
        data-end-date="1555249081000"
        data-days-format="%D"
        data-hours-format="%H"
        data-minutes-format="%M"
        data-seconds-format="%S"
        data-days-expired-classes="u-countdown--days-expiried"
    >

        <div class="landing-block-node-number u-countdown--days-hide d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-days">12</span>
            </div>
        </div>

        <div class="landing-block-node-number-delimiter u-countdown--days-hide d-inline-block g-font-size-36">:</div>

        <div class="landing-block-node-number d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-hours">01</span>
            </div>
        </div>

        <div class="landing-block-node-number-delimiter d-inline-block g-font-size-36">:</div>

        <div class="landing-block-node-number d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-minutes">52</span>
            </div>
        </div>

        <div class="landing-block-node-number-delimiter d-inline-block g-font-size-36">:</div>

        <div class="landing-block-node-number d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-seconds">52</span>
            </div>
        </div>

    </div>
</section>
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

