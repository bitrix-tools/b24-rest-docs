# Добавить нумератор documentgenerator.numerator.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.numerator.add` добавляет новый нумератор.

#|
|| **Параметр** | **Описание** ||
|| **name** | Имя. ||
|| **template** | Шаблон. ||
|| **settings** | Настройки генераторов. ||
|#

## Пример

```php
\Bitrix\Main\Loader::includeModule('rest');
$client = new \Bitrix\Main\Web\HttpClient();
$webHookUrl = 'http://mycrm.bitrix24.com/rest/1/webhookkey/';
$prefix = 'documentgenerator';

$data = [
    'fields' => [
        'name' => 'Rest Numerator',
        'template' => '{NUMBER}',
        'settings' => [
            'Bitrix_Main_Numerator_Generator_SequentNumberGenerator' => [
                'start' => '0',
                'step' => '1',
            ],
        ],
    ],
];

$url = $webHookUrl.$prefix.'.numerator.add/';
$answer = $client->post($url, $data);
try
{
    $result = \Bitrix\Main\Web\Json::decode($answer);
}
catch(Exception $e)
{
    var_dump($answer);
}

print_r($result);
```


# Ответ в случае успеха

Возвращает результат, идентичный [documentgenerator.numerator.get()](./document-generator-numerator-get.md).

> 200 OK

```php
[result] => Array
    (
        [numerator] => Array
            (
                [name] => new rest numerator
                [template] => {NUMBER}
                [id] => 68
                [settings] => Array
                    (
                        [Bitrix_Main_Numerator_Generator_SequentNumberGenerator] => Array
                            (
                                [start] => 0
                                [step] => 1
                                [periodicBy] =>
                                [timezone] =>
                                [isDirectNumeration] =>
                            )

                    )

            )
    )
```

Из ответа получаем `id` нумератора и можем дальше его использовать.