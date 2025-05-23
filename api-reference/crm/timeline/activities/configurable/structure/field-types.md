# Типы полей

Доступные типы полей для конфигурации [своих типов дел](../../types/index.md).

## textWithTranslation

Текст с поддержкой переводов.

Поля с типом `textWithTranslation` поддерживают мультиязычность. В простом варианте достаточно передать в них строку. Эта строка и будет использована как значение.

Если требуется поддержка разных языков интерфейса, в качестве значения поля можно передать не пустой массив, где ключами будет код языка, а значением текст на этом языке, например:

```json
{
    "ru": "Сохранить",
    "en": "Save"
}
```

Если перевод для текущего языка не найден, будет использован английский. Если перевод на английском не найден, будет использован первый элемент массива.

## Scope

Область видимости. Где показывать блок.

Некоторые блоки записи таймлайна имеют параметр `scope`. Если он заполнен, то видимость соответствующего блока будет ограничена только конкретным типом устройства.

Возможные значения:

- **Не заполнено** - блок будет показан везде
- **web** - блок будет показан только в браузере
- **mobile** - блок будет показан только в мобильном приложении