# Формы поиска

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Такие блоки содержат форму со строкой поиска и кнопкой отправки данных на страницу [результатов поиска](./search.md).

Минимальные условия корректного функционирования такого блока:

1. Наличие тега `<form>`, строки ввода запроса `<input>`, кнопки отправки данных.
2. Наличие атрибута для селектора `<form>`.

    ```js
    'attrs' => [
        '.landing-block-node-form' => [
            'name' => 'Search result page',
            'attribute' => 'action',
            'type' => 'url',
            'allowedTypes' => [
                'landing',
            ],
            'disableCustomURL' => true,
            'disallowType' => true,
            'disableBlocks' => true
        ]
    ]
    ```
3. По желанию к описанию блока можно добавить **subtype** и **subtype_params**. В таком случае в атрибут **Search result page** (см. п.2) будет подставлена страница при добавлении блока (что удобно для пользователя):

    ```js
    'block' => [
        'name' => Loc::getMessage('LANDING_BLOCK_59_2-NAME'),
        'section' => array('sidebar', 'other'),
        'subtype' => 'search',
        'subtype_params' => [
            'type' => 'form',
            'resultPage' => 'result'
        ]
    ],
    ```

    Где **result** код шаблона страницы результатов поиска. Если такая страница будет найдена на сайте, она добавится автоматически.