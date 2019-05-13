import sys
import RPi.GPIO as IO


IO.setmode(IO.BOARD)
IO.setup(12, IO.OUT)
p = IO.PWM(12, 50)
p.start(7.5)


angle = sys.argv[1]

if(angle == 0):
    p.ChangeDutyCycle(2.5)
if(angle == 90):
    p.ChangeDutyCycle(7.5)

p.stop()
IO.cleanup()


