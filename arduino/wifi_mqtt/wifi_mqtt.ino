#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino
#include <PubSubClient.h>
//needed for library
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager
#include "DHT.h"                  //sensor de humedad y temperatura
//for LED status
#include <Ticker.h>
Ticker ticker;

  /**************/
 /*  CONSTANTS */
/**************/
//TOPICS
#define topicHello "rb/ali/hello"           //topic luz
#define topicTemp "rb/ali/sens/tem"            //topic temperatura
#define topicHumedad "rb/ali/sens/hamb"        //topic humedad
#define topicPIR "rb/ali/sens/pir"             //detector de movimiento
#define topicError "rb/ali/error"              //error
#define topicCmd "rb/ali/cmd/#"               //topic de comandos de entrada


bool publishAll = true;   //flag qeu indica cuando publicar todo
//SENSOR TEMPERATURA
#define DHTPIN D4          //PIN DEL SENSOR DE TEMPERATURA
#define DHTTYPE DHT22     // DHT 22  (AM2302), AM2321
DHT dht(DHTPIN, DHTTYPE); //inicializa el sensor

//MOVIMIENTO
const byte PIRPIN = D3;
bool pirState;
bool pirLastState;
//LEDS
const byte LEDOK = D1;
const byte LEDERROR = D2;

WiFiClient espClient;
PubSubClient client(espClient);
const char* mqtt_server = "test.mosquitto.org";
//const char* mqtt_server = "broker.hivemq.com";

long lastMsg = 0;
char msg[50];
int value = 0;

void tick()
{
  //toggle state
  int state = digitalRead(LEDOK);  // get the current state of GPIO1 pin
  digitalWrite(LEDOK, !state);     // set pin to the opposite state
}

//gets called when WiFiManager enters configuration mode
void configModeCallback (WiFiManager *myWiFiManager) {
  Serial.println("Entered config mode");
  Serial.println(WiFi.softAPIP());
  //if you used auto generated SSID, print it
  Serial.println(myWiFiManager->getConfigPortalSSID());
  //entered config mode, make led toggle faster
  ticker.attach(0.2, tick);
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);
  
  Serial.println("INICIANDO!!!");
  pinMode(LEDOK, OUTPUT);
  pinMode(LEDERROR, OUTPUT);
  
  pinMode(PIRPIN, INPUT);
  //attachInterrupt(digitalPinToInterrupt(PIRPIN), movement, RISING );
  
  digitalWrite(LEDERROR, HIGH);//CUANDO SE APAGA EL MQTT ESTA OK
  digitalWrite(LEDOK, LOW);
  
    
  // start ticker with 0.5 because we start in AP mode and try to connect
  ticker.attach(0.6, tick);

  //WiFiManager
  //Local intialization. Once its business is done, there is no need to keep it around
  WiFiManager wifiManager;
  //reset settings - for testing
  //wifiManager.resetSettings();

  //set callback that gets called when connecting to previous WiFi fails, and enters Access Point mode
  wifiManager.setAPCallback(configModeCallback);

  //fetches ssid and pass and tries to connect
  //if it does not connect it starts an access point with the specified name
  //here  "AutoConnectAP"
  //and goes into a blocking loop awaiting configuration
  if (!wifiManager.autoConnect()) {
    Serial.println("failed to connect and hit timeout");
    //reset and try again, or maybe put it to deep sleep
    ESP.reset();
    delay(1000);
  }

  //if you get here you have connected to the WiFi
  Serial.println("connected...yeey :)");
  ticker.detach();
  //keep LED on
  digitalWrite(LEDOK, HIGH);
  
  client.setServer(mqtt_server, 1883);
  
  client.setCallback(callback);
  dht.begin();
}

void callback(char* topic, byte* payload, unsigned int length) {

}

void movement() {
  pirState=!pirState;
  
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("RB122345")) {
      digitalWrite(LEDERROR, LOW);
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish(topicHello, "1");
      // ... and resubscribe
      client.subscribe(topicCmd);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      digitalWrite(LEDERROR, HIGH);
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {
  
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  long now = millis();
  if (now - lastMsg > 1000) { 
    lastMsg = now;
    float h = dht.readHumidity();       // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
    publish(topicHumedad,h);
    float t = dht.readTemperature();
    publish(topicTemp,t);
  }

  pirState=(digitalRead(PIRPIN)==HIGH);
  if(pirState != pirLastState){
    pirLastState=pirState;
    publish(topicPIR,pirLastState);
  }
}
void publish(const char* topic, String payload)
{
  client.publish(topic,payload.c_str(),true);
  Serial.print(topic);
  Serial.print(":");
  Serial.print(payload);
  Serial.print("\n");
}

void publish(const char* topic, float payload)
{
  char charMsg[10];
  memset(charMsg,'\0',10);
  dtostrf(payload, 4, 2, charMsg);
  client.publish(topic,charMsg,true);
  
  //IMPRIME TODO
  Serial.print(topic);
  Serial.print(":");
  Serial.print(payload);
  Serial.print("\n");
  
  charMsg[0] = (char)0;//LIMPIA MEMORIA
}

void publish(const char* topic, int payload)
{
  char charMsg[10];
  memset(charMsg,'\0',10);
  dtostrf(payload, 4, 2, charMsg);
  client.publish(topic,charMsg,true);
  Serial.print(topic);
  Serial.print(":");
  Serial.print(payload);
  Serial.print("\n");
  charMsg[0] = (char)0;//LIMPIA MEMORIA
}


