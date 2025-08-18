package com.example.fitnesstrackingapp.utils.lib;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;

public class DeserializeDuration  extends JsonDeserializer<Duration> {

    @Override
    public Duration deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        String text = jsonParser.getText();
        LocalTime lt = LocalTime.parse(text);
        return Duration.ofHours(lt.getHour())
                .plusMinutes(lt.getMinute())
                .plusSeconds(lt.getSecond());
    }
}
