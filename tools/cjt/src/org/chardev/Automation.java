package org.chardev;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.InputEvent;

public class Automation {
	public static void main(String[] args) throws AWTException, InterruptedException {
		
		Robot r = new Robot();
		
		Thread.sleep(5000);
		
		while (true) {
			r.mousePress(InputEvent.BUTTON1_MASK);
			Thread.sleep(5);
			r.mouseRelease(InputEvent.BUTTON1_MASK);
			Thread.sleep(20);
		}
	}
}
