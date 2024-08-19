# Карты в блоках

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Чтобы работать с картами (пока поддерживаются карты Google) и иметь весь функционал по их редактированию, необходимо:

1. Разместить два ключа в секции **block**: subtype и subtype_params (подробнее смотрите пример манифеста).
2. Указать расширение **landing_google_maps_new** (смотрите assets в примере манифеста).
3. Указать необходимой ноде (где будет карта) тип **map**.

## Пример манифеста

```js
return [
    'block' => [
        'name' => 'Карта Google',
        'section' => ['contacts'],
        'subtype' => 'map',
        'subtype_params' =>[
            'required' => 'google'
        ],
    ],
    'cards' => [],
    'nodes' => [
        '.landing-block-node-map' => [
            'name' => 'Map',
            'type' => 'map',
        ]
    ],
    'style' => [
        'block' => [
            'type' => ['block-default-wo-background-vh-animation']
        ],
        'nodes' => [],
    ],
    'assets' => [
        'ext' => ['landing_google_maps_new'],
    ]
];
```

Пример блока для данного манифеста:

```html
<section class="landing_block g-pt-0 g-pb-0 g-height-70vh">
     <div class="landing-block-node-map h-100" data-map></div>
</section>
```

Примеры блоков данного типа вы можете посмотреть в нашем репозитории, воспользовавшись методами [landing.block.getmanifestfile](../methods/landing-block-get-manifest-file.md) и [landing.block.getrepository](../methods/landing-block-get-repository.md). Их коды:
- 16.3.two_cols_map_text_fix
- 16.4.three_cols_map
- 16.5.two_cols_map
- 16.6.two_cols_map_reverse
- 16.1.google_map
- 16.2.two_cols_text_map_fix
- и многие другие